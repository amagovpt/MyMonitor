import "./styles.css";
// Hooks
import { useContext, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Modal from 'react-modal';
import { Link, useNavigate } from "react-router-dom";
import { pathURL } from "../../App";
import moment from 'moment'

// Dark / Light Theme Context
import { ThemeContext } from "../../context/ThemeContext";
import { getData, logoutUser, removeLocalStorages } from "../../utils/utils";

import { Breadcrumb, Button, Icon } from "ama-design-system";

import { ChooseFile } from "./_components/chooseFile";
import { SuccessfulUploadExtensionEvaluationDialog } from "./modal/successfulUploadExtensionEvaluationDialog";

import { api } from '../../config/api';

export default function AddPages() {
  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext);
  const homeDark = theme === "light" ? "" : "websites_dark";
  const homeDarkSection = theme === "light" ? "bg-white" : "websites_dark";
  const textColorTheme = theme === "light" ? "" : "text-white";
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const [parsedData, setParsedData] = useState();
  const [error, setError] = useState(false)

  const [openDialog, setOpenDialog] = useState(false);

  const splitedPath = location.pathname.split("/")
  const name = decodeURIComponent(splitedPath[splitedPath.length - 2]) || null
  const [announceTitle, setAnnounceTitle] = useState('');
  const pageTitle = `${t("UPLOAD_EXTENSION_EVALUATION.ADD.title")} ${name}`

  useEffect(() => {
    document.title = pageTitle;

    setAnnounceTitle(pageTitle);
  }, []);
  const breadcrumbs = [
    { children: <Link to={`${pathURL}user`}>{t("HEADER.NAV.home")}</Link> },
    {
      children: <Link to={`${pathURL}user/${name}`}>{name}</Link>
    },
    {
      title: t("UPLOAD_EXTENSION_EVALUATION.ADD.title") ,
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
          <h1>{t("UPLOAD_EXTENSION_EVALUATION.ADD.title")}</h1>
        </div>
        <div className={`${homeDarkSection} p-5`}>
          <p className={`${textColorTheme} ama-typography-body-large mb-4`}>{t("UPLOAD_EXTENSION_EVALUATION.ADD.tutorial_text")}</p>
          <ChooseFile data={data} openDialog={openDialog} setOpenDialog={setOpenDialog} />
          <Modal
            isOpen={openDialog}
            onRequestClose={() => setOpenDialog(false)}
          >
            <SuccessfulUploadExtensionEvaluationDialog close={() => setOpenDialog(false)} />
          </Modal>
        </div>
      </div>
    </>
  );
}
