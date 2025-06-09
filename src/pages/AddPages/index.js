
// Hooks
import { useContext, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Modal from 'react-modal';
import { Link, useNavigate } from "react-router-dom";
import { pathURL } from "../../App";
import moment from 'moment'

// Dark / Light Theme Context
import { ThemeContext } from "../../context/ThemeContext";

import { Breadcrumb, Tabs, Button, Icon } from "ama-design-system";

import { ChooseFileAddPage } from "./tabs/chooseFileAddPage";
import { AddPagesText } from "./tabs/addPagesText";
import { Crawl } from "./tabs/crawl";
import { getData, createStatisticsObject, logoutUser, removeLocalStorages, pagesListTable } from "../../utils/utils";
import { RemovePagesSection } from "./modal/removePagesSection";
import { ReEvaluateSection } from "./modal/reEvaluateSection";
import { api } from '../../config/api'

export default function AddPages() {
  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext);
  const homeDark = theme === "light" ? "" : "websites_dark";
  const homeDarkSection = theme === "light" ? "bg-white" : "websites_dark";
  const textColorTheme = theme === "light" ? "" : "text-white";
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(false);
  const [showSecondModal, setShowSecondModal] = useState(false)
  const [parsedData, setParsedData] = useState();
  const [reEvaluatePagesLayout, setReEvaluatePagesLayout] = useState(false);
  const [error, setError] = useState(false)
  const [removePagesLayout, setRemovePagesLayout] = useState(false);

  const closeSecondModal = () => {
    setShowSecondModal(false)
    setError(false)
    setRemovePagesLayout(false)
    setReEvaluatePagesLayout(false)
  }
  const splitedPath = location.pathname.split("/")
  const name = decodeURIComponent(splitedPath[splitedPath.length - 2]) || null
  const [announceTitle, setAnnounceTitle] = useState('');
  const pageTitle = `${t("ADD_PAGES.title")} ${name}`

  useEffect(() => {
    document.title = pageTitle;

    setAnnounceTitle(pageTitle);
  }, []);
  const breadcrumbs = [
    { children: <Link to={`${pathURL}`}>{t("HEADER.NAV.ecosystem")}</Link> },
    { children: <Link to={`${pathURL}user`}>{t("HEADER.NAV.home")}</Link> },
    {
      children: <Link to={`${pathURL}user/${name}`}>{name}</Link>
    },
    {
      title: t("ADD_PAGES.title") ,
    }
  ];
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
  useEffect(() => {
    const processData = async () => {
      setLoading(true)

      const { response, err } = await api.getUserData()
      if (err && err.code && err.code === "ERR_NETWORK") {
        setError(t("MISC.unexpected_error") + " " + t("MISC.error_contact"));
      } else if (response && response.data.success === 1) {

        const userWebsites = response.data.result

        let websiteList = []
        let websiteListForWebsitePage = []

        await Promise.all(userWebsites.map(async (website, index) => {
          const { response, err } = await api.getUserWebsite(website.Name);
          if (err && err.code && err.code === "ERR_NETWORK") {
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

        //localStorage.setItem('websiteList', JSON.stringify(websiteList))
        //localStorage.setItem('websiteListForWebsitePage', JSON.stringify(websiteListForWebsitePage))
        setParsedData(websiteListForWebsitePage)
        const targetObject = websiteListForWebsitePage.find(obj => obj.name === name);
        if (targetObject) {
          setData(targetObject)
        } else {
          navigate(`${pathURL}user`)
        }
      }
      setLoading(false)
    }

    if (api.isUserLoggedIn()) {
      processData()
      const websiteListForWebsitePage = localStorage.getItem('websiteListForWebsitePage')
      if (websiteListForWebsitePage) {
      } else {
        const parsedData = JSON.parse(websiteListForWebsitePage)
        setParsedData(parsedData)
        const targetObject = parsedData.find(obj => obj.name === name);
        if (targetObject) {
          setData(targetObject)

        } else {
          navigate(`${pathURL}user`)
        }
      }
    } else {
      removeLocalStorages(navigate)
    }
  }, [])
  useEffect(() => {
    const tabs = document.querySelectorAll("[role='tab'][tabindex='-1']");
    tabs.forEach((tab) => {
      tab.removeAttribute("tabindex");
    });
  }, []);

  const tabsAddPages = [
    {
      eventKey: "tab1",
      title: t("ADD_PAGES.tab1"),
      component:
        <div className={`${homeDark}`} >
          <AddPagesText data={data} name={name} setShowSecondModal={setShowSecondModal} closeModal={closeSecondModal} />
        </div>,
    },
    {
      eventKey: "tab2",
      title: t("ADD_PAGES.tab2"),
      component:
        <div className={`${homeDark}`}>
          <ChooseFileAddPage data={data} name={name} setShowSecondModal={setShowSecondModal} closeModal={closeSecondModal} />
        </div>,
    },
    {
      eventKey: "tab3",
      title: t("ADD_PAGES.tab3"),
      component:
        <div className={`${homeDark}`}>
          <Crawl data={data} name={name} setShowSecondModal={setShowSecondModal} closeModal={closeSecondModal} />
        </div>,
    },
    {
      eventKey: "tab4",
      title: t("ADD_PAGES.tab4"),
      component:
        <>
          <div className="d-flex flex-row justify-content-start align-items-center gap-4 crawl_actions">
            <div>
              <span className={`${textColorTheme}`}>{t("ADD_PAGES.transfer.message")}</span>
            </div>
            <Button
              darkTheme={theme}
              variant={"primary"}
              text={t(`ADD_PAGES.transfer.button`)}
              size={"lg"}
              onClick={() => transferPages()}
            />
          </div>
          <p aria-live="assertive" className={`${textColorTheme} text-center bold ama-typography-body-large mt-3`}> {message || ""}</p>
        </>,
    },
  ];

  const transferPages = async () => {
    const { response, err } = await api.addPageTransfer(name)
    if (err && err.code && err.code === "ERR_NETWORK") {
      setMessage(t("MISC.unexpected_error") + " " + t("MISC.error_contact"));
    } else if (err && err.code && err.code !== "ERR_NETWORK") {
      setMessage(t(`ADD_PAGES.transfer.error`))
    } else if (response && response.data.success === 1) {
      setMessage(t(`ADD_PAGES.transfer.success`))
    }
  }

  return (
    <>
      <div
        aria-live="assertive"
        className="assertive-div"
      >
        {announceTitle}
      </div>
      <div className={`container ${homeDark}`}>
        <div className="link_breadcrumb_container d-flex flex-row justify-content-between align-items-center ">
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
        <Button
          darkTheme={theme}
          variant={"primary"}
          className={"mb-4"}
          aria-label={t(`RESULTS.actions.back`)}
          text={t(`RESULTS.actions.back`)}
          onClick={() => navigate(`/user/${name}`)}
          iconLeft={<Icon name="AMA-SetacurtaoficialEsq-Line" />}
        />
        <div className="d-flex flex-row justify-content-between mb-3 align-items-center ">
          <h1>{t("ADD_PAGES.title")}</h1>
        </div>
        <div className={`${homeDarkSection} p-5`}>
          <p className={`${textColorTheme} ama-typography-body-large mb-4`}>{t("ADD_PAGES.tutorial_text")}</p>
          <Tabs tabs={tabsAddPages} defaultActiveKey="tab1" vertical={false} darkTheme={theme} />
          <Modal
            isOpen={showSecondModal}
            onRequestClose={() => closeSecondModal()}
            contentLabel={`${reEvaluatePagesLayout ? t("PAGES.re_evaluate") : removePagesLayout ? t("PAGES.dialog.title") : t("ADD_PAGES.title")}`}
            className={`${theme === "light" ? "second_website_modal" : "second_website_modal_dark"} modal-alert`}
            overlayClassName={theme === "light" ? "website_overlay_modal" : "website_overlay_modal_dark"}
          >
            {reEvaluatePagesLayout ?
              <ReEvaluateSection closeModal={closeSecondModal} loading={loading} error={error} />
              :
              (removePagesLayout ?
                <RemovePagesSection closeModal={closeSecondModal} error={error} name={name} pagesSelected={pagesSelected} setError={setError} setPagesList={setPagesList} parsedData={parsedData} />
                :
                <div className="modal_container d-flex flex-column p-4">
                  <div className="d-flex flex-row justify-content-between mb-3 align-items-center">
                    <h2>{t("ADD_PAGES.title")}</h2>
                    <Button
                      darkTheme={theme}
                      variant={"secondary"}
                      className={"close_modal"}
                      aria-label={t(`ADD_PAGES.evaluations_dialog.close`)}
                      text={t(`ADD_PAGES.evaluations_dialog.close`)}
                      onClick={() => closeSecondModal()}
                      size={"lg"}
                      iconRight={<Icon name="AMA-Erro2-Line" />}
                    />
                  </div>
                  <p className="ama-typography-body-large">{t("ADD_PAGES.evaluations_dialog.message")}</p>
                </div>
              )
            }
          </Modal>
        </div>
      </div>
    </>
  );
}
