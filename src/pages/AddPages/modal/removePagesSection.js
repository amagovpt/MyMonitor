
// Hooks
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import moment from 'moment'

// Dark / Light Theme Context
import { ThemeContext } from "../../../context/ThemeContext";

import {  getData, createStatisticsObject, logoutUser, removeCertainPages, pagesListTable } from "../../../utils/utils";

import { Button, Icon } from "ama-design-system";

import { pathURL } from "../../../App";
import { api } from '../../../config/api'

export function RemovePagesSection({closeModal, error, name, pagesSelected, setError, setPagesList, parsedData}) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  

  const removePages = async () => {
    const newPagesSelected = {};
    pagesSelected.forEach(item => {
      newPagesSelected[item.id] = item;
    });
    if(api.isUserLoggedIn()) {
      const {response, err} = await api.removePages({website: name, pagesId: newPagesSelected})
      if(err && err.code && err.code === "ERR_NETWORK") {
        setError(t("MISC.unexpected_error") + " " + t("MISC.error_contact"));
      } else if (response && response.data.success === 1) {
        const newArray = removeCertainPages(parsedData, name, response.data.result)
        const targetObject = newArray.find(obj => obj.name === name);
        const list = pagesListTable(targetObject.pages, moment)
        setPagesList(list)
        closeModal()
      }
    } else {
      localStorage.removeItem('MM-username');
      localStorage.removeItem('MM-SSID');
      localStorage.removeItem('expires-at');
      localStorage.removeItem('websiteList')
      localStorage.removeItem('websiteListForWebsitePage')
      navigate(`${pathURL}`)
    }
  }

  return (
    <div className="modal_container d-flex flex-column p-4">
        <div className="d-flex flex-row justify-content-between mb-3 align-items-center">
          <h2>{t("PAGES.dialog.title")}</h2>
          <Button
            darkTheme={theme}
            variant={"secondary"}
            className={"close_modal"}
            aria-label={t(`ADD_PAGES.evaluations_dialog.close`)}
            text={t(`ADD_PAGES.evaluations_dialog.close`)}
            onClick={() => closeModal()}
            size={"lg"}
            iconRight={<Icon name="AMA-Erro2-Line" />}
          />
        </div>
        {!error ?
          <>
            <div className="mb-5">
              <p className="ama-typography-body-large mb-3">{t("PAGES.dialog.first_sentence")}</p>
              <p className="ama-typography-body-large">{t("PAGES.dialog.second_sentence")}</p>
            </div>
            <div className="d-flex flex-row justify-content-between align-items-center">
              <Button
                darkTheme={theme}
                variant={"success"}
                className={""}
                text={t(`PAGES.dialog.yes`)}
                onClick={() => removePages()}
                size={"lg"}
              />
              <Button
                darkTheme={theme}
                variant={"danger"}
                className={""}
                text={t(`PAGES.dialog.no`)}
                onClick={() => closeModal()}
                size={"lg"}
              />
            </div>
          </>
        :
          <p className="ama-typography-body-large h-100 mt-6">{error}</p>
        }
    </div>
  );
}
