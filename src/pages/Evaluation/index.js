import "./styles.css";
import { useContext, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";


import { Breadcrumb, LoadingComponent, Gauge, Button, Icon, StatsTable, TableComponent } from "ama-design-system";
import { ButtonsActions } from "./_components/buttons-revalidation";

import { pathURL } from "../../App";
import { api } from '../../config/api'
import LZString from 'lz-string';

import { logoutUser, removeLocalStorages, downloadCSV, checkUserHasPage } from "../../utils/utils";
import { optionForAccordion, callbackImgT } from "./utils";
import { processData } from "../../services";

export let tot;

// Extra Data / Functions

export default function Evaluation() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const splitedPath = location.pathname.split("/")
  const name = decodeURIComponent(splitedPath[splitedPath.length-2]) || null
  const pageName = decodeURIComponent(splitedPath[splitedPath.length-1]) || null

  const { theme } = useContext(ThemeContext);
  const homeDark = theme === "light" ? "" : "evaluation_dark";

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [parsedData, setParsedData] = useState();
  const [dataProcess, setDataProcess] = useState();

  // Navigation options
  const breadcrumbs = [
    { children: <Link to={`${pathURL}`}>{t("HEADER.NAV.ecosystem")}</Link> },
    { children: <Link to={`${pathURL}user`}>{t("HEADER.NAV.home")}</Link> },
    { children: <Link to={`${pathURL}user/${encodeURIComponent(name)}`}>{name}</Link> },
    {
      title: pageName
    }
  ];

  const request = () => {
    const fetchData = async () => {
      setLoading(true)
      const {response, err} = await api.getPageEvaluation(encodeURIComponent(name), encodeURIComponent(pageName))
      if(err && err.code && err.code) {
        setError(t("MISC.unexpected_error") + " " + t("MISC.error_contact"));
      } else if(response && response.data.success === 1) {
        localStorage.setItem("evaluation", LZString.compressToUTF16(JSON.stringify(response.data)));
        localStorage.setItem("evaluationUrl", pageName);
        setParsedData(response.data)
        setDataProcess(processData(response.data?.result?.data?.tot, pageName))
        tot = response?.data?.result?.data.tot;
      }
      setLoading(false)
    }

    localStorage.removeItem('evaluation')
    localStorage.removeItem('evaluationUrl')
    localStorage.removeItem("elemData");
    fetchData();
  };

  const seeCode = () => {
    return `${pathURL}user/${encodeURIComponent(name)}/${encodeURIComponent(pageName)}/code`;
  };

  function setAllDataResult(elem, allData) {
    localStorage.setItem("elemData", LZString.compressToUTF16(JSON.stringify(allData)));
    navigate(`${pathURL}user/${encodeURIComponent(name)}/${encodeURIComponent(pageName)}/${elem}`);
  }

  useEffect(() => {
    if(api.isUserLoggedIn()) {
      const storedData = LZString.decompressFromUTF16(localStorage.getItem("evaluation"));
      const storedUrl = localStorage.getItem("evaluationUrl");
      const websiteListForWebsitePage = localStorage.getItem('websiteListForWebsitePage')
      if(checkUserHasPage(name, JSON.parse(websiteListForWebsitePage), pageName)) {
        if(storedData && storedUrl === pageName) {
          const parsedData = JSON.parse(storedData)
          setParsedData(parsedData)
          setDataProcess(processData(parsedData?.result?.data?.tot, pageName))
          tot = parsedData?.result?.data?.tot;
        } else {
          request();
        }
      } else {
        navigate(`${pathURL}user`)
      }
    } else {
      removeLocalStorages(navigate)
    }
  },[])

  const scoreData = dataProcess?.metadata?.score;
  let scoreDataFormatted = scoreData && scoreData.toString();

  if (scoreDataFormatted === "10.0") {
    scoreDataFormatted = "10";
  }

  return (
    <>
      <div className={`container ${homeDark}`}>
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
        <div className="report_container">
          <h1 className="report_container_subtitle">{t("RESULTS.title")}</h1>
          {loading ? (
            <section className={`loading_container bg-white`}>
              <LoadingComponent loadingText={t("MISC.loading")} darkTheme={theme} />
            </section>
          ) : (
            !error && <ButtonsActions
              reRequest={request}
              seeCode={`${pathURL}user/${encodeURIComponent(name)}/${encodeURIComponent(pageName)}/code`}
              downloadCSV={() => downloadCSV(dataProcess, parsedData, t)}
              href={pageName}
              themeClass={homeDark}
            />
          )}
        </div>
        {!loading && (
          !error ? 
            <>
              <section className="sumary_container bg-white my-5 py-4 px-5">
                <h2>{t("RESULTS.summary.title")}</h2>
                <div className="d-flex flex-row mt-5 mb-5 justify-content-between align-items-center container_uri_chart gap-3">
                  <div className="mobile_width w-25 text-center">
                    {scoreDataFormatted > 0 && <Gauge percentage={scoreDataFormatted} darkTheme={theme} title={[t("RESULTS.summary.score")]} screenReaderTitle={t("STATISTICS.gauge.description_s", {value: scoreDataFormatted})}  />}
                  </div>
                  <div className="mobile_width d-flex flex-column gap-4 w-75 container_uri">
                    <div className="d-flex flex-column">
                      <span className="bold">URL</span>
                      <span className="break_url">{dataProcess?.metadata?.url}</span>
                    </div>

                    <div className="d-flex flex-column">
                      <span className="bold">{t("RESULTS.summary.metadata.title_label")}</span>
                      <span>{dataProcess?.metadata?.title}</span>
                    </div>
                  </div>
                </div>
                <div className="d-flex flex-row justify-content-between align-items-center container_uri_chart gap-3">
                  <div className="mobile_width d-flex flex-column gap-4 w-25">
                    <div className="d-flex flex-column text-center">
                      <span className="ama-typography-display-6 bold">{dataProcess?.metadata?.n_elements}</span>
                      <span>{t("RESULTS.summary.metadata.n_elements_label")}</span>
                    </div>

                    <div className="d-flex flex-column text-center">
                      <span className="ama-typography-display-6 bold">{dataProcess?.metadata?.size}</span>
                      <span>{t("RESULTS.summary.metadata.page_size_label")}</span>
                    </div>
                  </div>
                  <div className="mobile_width table_container_sumary w-75 mt-3">
                    {dataProcess && <StatsTable
                      data={{data: dataProcess}}
                      darkTheme={theme}
                      ok={t("RESULTS.summary.table.labels.ok")}
                      warning={t("RESULTS.summary.table.labels.warn")}
                      error={t("RESULTS.summary.table.labels.err")}
                      title={t("RESULTS.summary.table.title")}
                      caption={t("RESULTS.summary.metadata.caption")}
                      type={t("RESULTS.summary.table.typeLabel")}
                    />}
                  </div>
                </div>
              </section>

              <section className="bg-white avaliation_container my-5 py-4 px-5">
                <h2 className="mb-3">{t("RESULTS.results.title")}</h2>
                {dataProcess && <TableComponent
                  data={optionForAccordion(t, dataProcess)}
                  onClick={(elem) => setAllDataResult(elem, parsedData?.result?.data)}
                  imageTitlesCallback={(img) => callbackImgT(t, img)}
                  caption={t("RESULTS.results.caption")}
                  col1={t("RESULTS.results.practice")}
                  col2={t("RESULTS.results.lvl")}
                  col3={t("RESULTS.results.details")}
                  lvlTitle={t("RESULTS.results.lvl") + ": "}
                  ariaLabel={t("RESULTS.results.details")}
                  darkTheme={theme}
                  ariaLabels={{
                    button: t("RESULTS.results.details"),
                    A: t("WEBSITES_PAGE.results.ariaLabels.A"),
                    AA: t("WEBSITES_PAGE.results.ariaLabels.AA"),
                    AAA: t("WEBSITES_PAGE.results.ariaLabels.AAA")
                  }}
                />}
              </section>
            </>
           : 
            <>
              <h3 className="text-center mt-5 bold">{error}</h3>
            </>
        )}
      </div>
    </>
  );
}