import "./styles.css";
import { useContext, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import tests from "../../utils/tests"


import { Breadcrumb, LoadingComponent, Button, Icon } from "ama-design-system";
import { TableDetails } from "./_components/TableDetails";

import { pathURL } from "../../App";
import { api } from '../../config/api'
import LZString from 'lz-string';

import { logoutUser, removeLocalStorages, checkUserHasPage } from "../../utils/utils";
import { getTestResults } from "../../services";

export let tot;

// Extra Data / Functions

export default function Details() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const splitedPath = location.pathname.split("/")
  const name = decodeURIComponent(splitedPath[splitedPath.length-3]) || null
  const pageName = decodeURIComponent(splitedPath[splitedPath.length-2]) || null
  const detail = decodeURIComponent(splitedPath[splitedPath.length-1]) || null

  const { theme } = useContext(ThemeContext);
  const homeDark = theme === "light" ? "" : "details_dark";

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [dataTable, setDataTable] = useState();
  let resultKey = null;
  for (const key in tests) {
    if (tests[key].test === detail) {
      resultKey = key;
      break;
    }
  }
  const testResultType = dataTable?.size === 1 ? "s" : "p";
  const testResult = t(`TESTS_RESULTS.${resultKey}.${testResultType}`);

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
      title: name,
      href: "",
      onClick: () => navigate(`${pathURL}user/${encodeURIComponent(name)}`)
    },
    {
      title: pageName,
      href: "",
      onClick: () => navigate(`${pathURL}user/${encodeURIComponent(name)}/${encodeURIComponent(pageName)}`)
    },
    {
      title: <span
        dangerouslySetInnerHTML={{ __html: testResult.replace("{{value}}", dataTable?.size) }}
      />,
    }
  ];

  function getDetailsData(data, tt) {
    const response = getTestResults(detail, data, tt);
    setDataTable(response);
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
        localStorage.setItem("elemData", LZString.compressToUTF16(JSON.stringify(response.data?.result?.data)));
        tot = response?.data?.result?.data.tot;
        getDetailsData(response.data?.result?.data, tot);
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
            tot = parsedData?.result?.data?.tot;
            const allData = LZString.decompressFromUTF16(localStorage.getItem("elemData"));
            if(allData){
              const parsedElems = JSON.parse(allData)
              getDetailsData(parsedElems, tot);
            }
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

  let iconName;

  if (dataTable?.result === "R") {
    iconName = "AMA-Wrong-Line";
  } else if (dataTable?.result === "Y") {
    iconName = "AMA-Middle-Line";
  } else {
    iconName = "AMA-Check-Line";
  }

  let tdClassName;

  if (dataTable?.result === "R") {
    tdClassName = "error-cell";
  } else if (dataTable?.result === "Y") {
    tdClassName = "warning-cell";
  } else {
    tdClassName = "success-cell";
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
        <div>
          <h1 className="report_container_title mb-5">
            {t("ELEMENT_RESULTS.subtitle")}
          </h1>
        </div>
        {loading ? (
          <section className={`loading_container bg-white`}>
            <LoadingComponent loadingText={t("MISC.loading")} darkTheme={theme} />
          </section>
        )
        : 
          !error ?
            <>
              <div className="show_details bg-white">
                <div className="d-flex flex-row justify-content-between align-items-center show_details-container">
                  <div className="d-flex flex-row align-items-center">
                    <div className={`d-flex align-items-center justify-content-center m-2 p-3 ${tdClassName}`}>
                      <Icon name={iconName} />
                    </div>

                    <span
                      className="textHeader ama-typography-body-large bold"
                      dangerouslySetInnerHTML={{ __html: testResult.replace("{{value}}", dataTable?.size) }}
                    />
                  </div>

                  <div className="result_left_container">
                    <span className="ama-typography-display-6 bold p-2 ps-4">{dataTable?.size}</span>
                    <span className="ama-typography-body p-2">{t("ELEMENT_RESULTS.total_elements")}</span>
                  </div>
                </div>
              </div>

              <div className="tabContent_container-details py-4 px-5 mt-5">
                <TableDetails data={dataTable?.elements} />
              </div>
            </>
          :
            <>
              <h3 className="text-center mt-5 bold">{error}</h3>
            </>
        }
      </div>
    </>
  );
}