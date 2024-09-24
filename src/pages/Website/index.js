import "./styles.css";
import { useContext, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import moment from 'moment'

import { Breadcrumb, LoadingComponent, StatisticsHeader, Button, Icon, Tabs } from "ama-design-system";
import { RadarGraph } from "./_components/radarGraph";
import { BarLineGraphTabs } from "./_components/barLineGraphTabs";
import { GoodBadTab } from "./_components/goodBadTab";
import { PagesTable } from "./_components/modal/pagesTable"

import { getStatTitles, pagesListTable } from "./utils";
import { getData, createStatisticsObject, logoutUser, removeLocalStorages } from "../../utils/utils";

import { pathURL } from "../../App";
import { api } from '../../config/api'

export default function Website() {
  const { t, i18n: {language} } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const splitedPath = location.pathname.split("/")
  const name = decodeURIComponent(splitedPath[splitedPath.length-1]) || null

  const { theme } = useContext(ThemeContext);
  const websiteDark = theme === "light" ? "" : "website_dark";

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [parsedData, setParsedData] = useState();
  const [pagesList, setPagesList] = useState([]);

  // Data for StatisticsHeader component
  const [websiteStats, setWebsiteStats] = useState({
    score: "0",
    recentPage: "",
    oldestPage: "",
    statsTable: [0, 0, 0, 0]
  });

  // General Data
  const [data, setData] = useState({
    name: "Unknown",
    startingUrl: "Unknown",
    accessibilityPlotData: [],
    scoreDistributionFrequency: [],
    nPages: 0,
    successDetailsTable: {
      practicesKeys: [],
      practicesData: []
    },
    bestPracticesDistribution: [],
    errorsDetailsTable: {
      practicesKeys: [],
      practicesData: []
    },
    errorsDistribution: []
  });

  const { statsTitles } = getStatTitles(t)

  // Navigation options
  const breadcrumbs = [
    {
      title: t("HEADER.NAV.ecosystem"),
      href: "",
      onClick: () => navigate(`${pathURL}`)
    },
    {
      title: t("HEADER.NAV.home"),
      href: "",
      onClick: () => navigate(`${pathURL}user`)
    },
    {
      title: name
    }
  ];

  const tabsGoodBad = [
    {
      eventKey: "tab1",
      title: t("WEBSITES_PAGE.tabs.best_practices"),
      component:
        <GoodBadTab 
          main_content_website={websiteDark}
          tempData={data && data.successDetailsTable}
          top10Data={data && data.bestPracticesDistribution}
          color={"#15ac51"}
          goodOrBad={"top_3_best_practices"}
          title={t("WEBSITES_PAGE.top_10_best_practices_title")}
        />,
    },
    {
      eventKey: "tab2",
      title: t("WEBSITES_PAGE.tabs.bad_practices"),
      component:
        <GoodBadTab
          main_content_website={websiteDark}
          tempData={data && data.errorsDetailsTable}
          top10Data={data && data.errorsDistribution}
          color={"#e90018"}
          goodOrBad={"top_3_bad_practices"}
          title={t("WEBSITES_PAGE.top_10_bad_practices_title")}
        />,
    },
  ];

  useEffect(() => {
    const processData = async () => {
      setLoading(true)

      const {response, err} = await api.getUserData()
      if(err && err.code && err.code === "ERR_NETWORK") {
        setError(t("MISC.unexpected_error") + " " + t("MISC.error_contact"));
      } else if (response && response.data.success === 1) {

        const userWebsites = response.data.result
        localStorage.setItem('userWebsites', JSON.stringify(userWebsites))

        let websiteList = []
        let websiteListForWebsitePage = []

        await Promise.all(userWebsites.map(async (website, index) => {
          const {response, err} = await api.getUserWebsite(website.Name);
          if(err && err.code && err.code === "ERR_NETWORK") {
            setError(t("MISC.unexpected_error") + " " + t("MISC.error_contact"));
            return err;
          } else if (response && response.data.success === 1) {
            const pages = response.data.result
            getData(website, pages, websiteList, websiteListForWebsitePage, moment)
          }
          return;
        }));

        websiteList.sort((a, b) => b.score - a.score);
        websiteList.forEach((obj, index) => {
          obj.rank = index + 1;
        });

        localStorage.setItem('websiteList', JSON.stringify(websiteList))
        localStorage.setItem('websiteListForWebsitePage', JSON.stringify(websiteListForWebsitePage))
        setParsedData(websiteListForWebsitePage)
        const targetObject = websiteListForWebsitePage.find(obj => obj.name === name);
        if(targetObject) {
          setData(targetObject)
          const list = pagesListTable(targetObject.pages, moment)
          setPagesList(list)
          setWebsiteStats(createStatisticsObject(targetObject, moment))
        } else {
          navigate(`${pathURL}user`)
        }
      }
      setLoading(false)
    }

    if(api.isUserLoggedIn()) {
      const websiteListForWebsitePage = localStorage.getItem('websiteListForWebsitePage')
      if(!websiteListForWebsitePage){
        processData()
      } else {
        const parsedData = JSON.parse(websiteListForWebsitePage)
        setParsedData(parsedData)
        const targetObject = parsedData.find(obj => obj.name === name);
        if(targetObject) {
          setData(targetObject)
          const list = pagesListTable(targetObject.pages, moment)
          setPagesList(list)
          setWebsiteStats(createStatisticsObject(targetObject, moment))
        } else {
          navigate(`${pathURL}user`)
        }
      }
    } else {
      removeLocalStorages(navigate)
    }
  },[])

  // useEffect to update the StatisticsHeader stats when language changes
  useEffect(() => {
    if(!parsedData) return
    const targetObject = parsedData.find(obj => obj.name === name);
    setWebsiteStats({
      score: targetObject.score ? (targetObject.score).toFixed(1) : 0,
      recentPage: moment(targetObject.recentPage).format("LL"),
      oldestPage: moment(targetObject.oldestPage).format("LL"),
      statsTable: [
        targetObject.nPages,
        targetObject.pagesWithoutErrors,
        targetObject.pagesWithErrors,
        targetObject.pagesWithoutErrorsA,
        targetObject.pagesWithoutErrorsAA,
        targetObject.pagesWithoutErrorsAAA
      ]
    })

    const list = pagesListTable(targetObject.pages, moment)
    setPagesList(list)
  }, [language])

  return (
    <>
      <div className={`container website ${websiteDark}`}>
        <div className="link_breadcrumb_container d-flex flex-row justify-content-between align-items-center">
          <Breadcrumb data={breadcrumbs} darkTheme={theme} />
          <Button
            darkTheme={theme}
            className={"align-self-center logout"}
            variant={"ghost"}
            text={t("LOGIN.logout")}
            iconRight={<Icon name={"AMA-Exit-Line"} />} 
            onClick={() => logoutUser(setLoading, setError, navigate, t)}
          />
        </div>

        <h1 className="bold my-2">{name}</h1>
        {!loading ?
          <>
            {!error ?
              <>
                <section className={`bg-white py-2 mt-5 d-flex flex-row justify-content-center`}>
                  <StatisticsHeader
                    darkTheme={theme}
                    stats={websiteStats}
                    statsTitles={statsTitles}
                    doubleRow={true}
                    title={t("WEBSITES_PAGE.statistics_title")}
                    subtitle={t("WEBSITES_PAGE.statistics_subtitle")}
                    oldestPage={t("STATISTICS.oldest_page_updated")}
                    newestPage={t("STATISTICS.newest_page_updated")}
                    gaugeTitle={t("STATISTICS.gauge.label")}
                    buttons={false}
                  />
                </section>

                {/* Radar Graph */}
                <section className={`bg-white py-2 mt-5 d-flex flex-row justify-content-center`}>
                  <div className="d-flex flex-column section_container py-4">
                    <h3 className="bold">{t("PAGES.accessibility_plot.title")}</h3>
                    <div className="d-flex radar_graphic justify-content-center">
                      <RadarGraph tempData={data} />
                    </div>
                  </div>
                </section>

                {/* Bar+Line Graph */}
                <section className={`bg-white mt-5 d-flex flex-row justify-content-center`}>
                  <div className="d-flex flex-column section_container py-4">
                    <h3 className="bold mb-3">{t("DIALOGS.scores.title")}</h3>
                    <BarLineGraphTabs tempData={data} websiteStats={websiteStats} />
                  </div>
                </section>

                {/* Good / Bad section */}
                <div className="good_bad mt-5">
                  <Tabs tabs={tabsGoodBad} defaultActiveKey="tab1" vertical={false} />
                </div>

                <section className={`bg-white px-5 py-2 mt-5 d-flex flex-row justify-content-center align-items-center`}>
                  <PagesTable data={data} pagesList={pagesList} setPagesList={setPagesList} name={name} parsedData={parsedData} mainTheme={websiteDark} />
                </section>
              </>
            : <>
                <h3 className="text-center mt-5 bold">{error}</h3>
              </>
            }
          </>
        : <LoadingComponent darkTheme={theme} loadingText={t("MISC.loading")} />}
      </div>
    </>
  );
}