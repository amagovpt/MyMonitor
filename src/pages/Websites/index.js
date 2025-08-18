import "./styles.css";
import { useContext, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, Link } from "react-router-dom";
import { Breadcrumb, LoadingComponent, SortingTable, Button, Icon } from "ama-design-system";
import { ThemeContext } from "../../context/ThemeContext";
import { Helmet } from "react-helmet";

import { pathURL } from "../../App";
import { api } from '../../config/api'

import moment from 'moment'

// Extra Data / Functions
import { getDirectoryTable } from "./utils"
import { getData, logoutUser, removeLocalStorages } from "../../utils/utils";

export default function Websites() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { theme } = useContext(ThemeContext);
  const homeDark = theme === "light" ? "" : "websites_dark";

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [directoriesList, setDirectoriesList] = useState();
  const [announceTitle, setAnnounceTitle] = useState('');
  const pageTitle = t("TITLES_PAGE.list_page")
  useEffect(() => {
    document.title = pageTitle;

    setAnnounceTitle(pageTitle);
  }, []);
  // Data and Options for the Tables on this page
  const { directoriesHeaders, columnsOptions, nameOfIcons, paginationButtonsTexts, nItemsPerPageText, itemsPaginationText, ariaLabels } = getDirectoryTable(t)

  // Navigation options
  const breadcrumbs = [
    {
      title: t("HEADER.NAV.home")
    }
  ];

  useEffect(() => {
    const processData = async () => {
      const {response, err} = await api.getUserData()
      console.log(response)
      if(err && err.code && err.code === "ERR_NETWORK") {
        setError(t("MISC.unexpected_error") + " " + t("MISC.error_contact"));
      } else if (response && response.data.success === 1) {
        const userWebsites = response.data.result
        
        let websiteList = []
        let websiteListForWebsitePage = []
        
        await Promise.all(userWebsites.map(async (website) => {
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
        setDirectoriesList(websiteList)
      }
      setLoading(false)
    }
    
    if(api.isUserLoggedIn()) {
      const websiteList = localStorage.getItem('websiteList')
      //Colocar ! antes do websiteList
      if(!websiteList){
        processData()
      } else {
        setDirectoriesList(JSON.parse(websiteList))
      }
    } else {
      removeLocalStorages(navigate)
    }
  },[])

  return (
    <>
    <Helmet>
        <title>{t("TITLES_PAGE.list_page")}</title>
      </Helmet>
      <div
        aria-live="assertive"
        className="assertive-div"
      >
        {announceTitle}
      </div>
      <div className={`container ${homeDark}`}>
        <div className="link_breadcrumb_container d-flex flex-row justify-content-between align-items-center">
          <Breadcrumb data={breadcrumbs} darkTheme={theme} tagHere={t("HEADER.ariaLabelBreadcrumb")} />
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
            <div className="ama-typography-body-large bold observatorio px-3">
              {t("WEBSITES_PAGE.title")}
            </div>
            <h1 className="bold my-2">{t("WEBSITES_PAGE.subtitle")}</h1>
        </div>
        {!loading ?
          <>
            {!error ?
              <>
                {directoriesList && directoriesList.length > 0 ?
                  <section className={`bg-white px-5 py-2 mt-5 d-flex flex-row justify-content-between`}>
                    <div className="d-flex flex-column py-4 w-100 directories_table">
                      <div>
                        <h2 className="bold m-0 mb-4">{t("WEBSITE_TABLE.table.subtitle")}</h2>
                      </div>
                      {directoriesList && <SortingTable
                        hasSort={true}
                        headers={directoriesHeaders}
                        setDataList={setDirectoriesList}
                        dataList={directoriesList}
                        columnsOptions={columnsOptions}
                        darkTheme={theme}
                        links={true}
                        caption={t("WEBSITE_TABLE.table.subtitle")}
                        iconsAltTexts={nameOfIcons}
                        pagination={true}
                        itemsPaginationTexts={itemsPaginationText}
                        nItemsPerPageTexts={nItemsPerPageText}
                        paginationButtonsTexts={paginationButtonsTexts}
                        project={`${pathURL}`}
                        ariaLabels={ariaLabels}
                        theme={theme}
                      />}
                      <div className="ama-typography-body mt-4">{t("WEBSITE_TABLE.table.note")}</div>
                    </div>
                  </section>
                : <h3 className="text-center mt-5 bold">{t("WEBSITE_TABLE.no_websites")}</h3>}
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