import "./styles.css";
import { useContext, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";


import { Breadcrumb, LoadingComponent, Button, Icon } from "ama-design-system";
import { ButtonsActions } from "./_components/buttons-revalidation";

import { pathURL } from "../../App";
import { api } from '../../config/api'
import LZString from 'lz-string';

import { logoutUser, removeLocalStorages, downloadCSV, checkUserHasPage } from "../../utils/utils";
import { processData } from "../../services";

export let tot;

// Extra Data / Functions

export default function PageCode() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const splitedPath = location.pathname.split("/")
  const name = decodeURIComponent(splitedPath[splitedPath.length-3]) || null
  const pageName = decodeURIComponent(splitedPath[splitedPath.length-2]) || null

  const { theme } = useContext(ThemeContext);
  const homeDark = theme === "light" ? "" : "pageCode_dark";

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [parsedData, setParsedData] = useState();
  const [dataProcess, setDataProcess] = useState();
  const [pageCode, setPageCode] = useState();

  // Navigation options
  const breadcrumbs = [
    { children: <Link to={`${pathURL}`}>{t("HEADER.NAV.ecosystem")}</Link> },
    { children: <Link to={`${pathURL}user`}>{t("HEADER.NAV.home")}</Link> },
    { children: <Link to={`${pathURL}user/${encodeURIComponent(name)}`}>{name}</Link> },
    { children: <Link to={`${pathURL}user/${encodeURIComponent(name)}/${encodeURIComponent(pageName)}`}>{pageName}</Link> },
    {
      title: t("HEADER.NAV.code"),
    }
  ];

  const handleGoBack = () => {
    navigate(`${pathURL}user/${encodeURIComponent(name)}/${encodeURIComponent(pageName)}`)
  }

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
        setPageCode(response.data?.result?.pagecode);
        tot = response?.data?.result?.data.tot;
      }
      setLoading(false)
    }
    localStorage.removeItem('evaluation')
    localStorage.removeItem('evaluationUrl')
    localStorage.removeItem("elemData");
    fetchData();
  };

  useEffect(() => {
    if(api.isUserLoggedIn()) {
      const storedData = LZString.decompressFromUTF16(localStorage.getItem("evaluation"));
      const storedUrl = localStorage.getItem("evaluationUrl");
      const websiteListForWebsitePage = localStorage.getItem('websiteListForWebsitePage');
      if(checkUserHasPage(name, JSON.parse(websiteListForWebsitePage), pageName)) {
        if(storedData && storedUrl === pageName) {
          const parsedData = JSON.parse(storedData)
          setParsedData(parsedData)
          setDataProcess(processData(parsedData?.result?.data?.tot, pageName))
          setPageCode(parsedData?.result?.pagecode);
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
        <div className="code_container">
          <h1 className="code_container_subtitle mb-5">{pageName}</h1>
          {loading ? (
            <section className={`loading_container bg-white`}>
              <LoadingComponent loadingText={t("MISC.loading")} darkTheme={theme} />
            </section>
          ) : (
            !error && <ButtonsActions
              downloadCSV={() => downloadCSV(dataProcess, parsedData, t)}
              handleGoBack={handleGoBack}
              themeClass={homeDark}
            />
          )}
          {!loading && (
            !error ?
              <section className="html_code">
                <pre tabIndex="0">{pageCode || `<></>`}</pre>
              </section>
            :
              <>
                <h3 className="text-center mt-5 bold">{error}</h3>
              </>
          )}
        </div>
      </div>
    </>
  );
}