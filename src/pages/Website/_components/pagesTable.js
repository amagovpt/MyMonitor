
// Hooks
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";

// Dark / Light Theme Context
import { ThemeContext } from "../../../context/ThemeContext";

import { SortingTable, Button, Icon, LoadingComponent } from "ama-design-system";
import Modal from 'react-modal';

import { getPagesSortingTable, pagesListTable, removeCertainPages } from "../utils";
import { pathURL } from "../../../App";

import { api } from '../../../config/api'

import moment from 'moment'

Modal.setAppElement('#root');

export function PagesTable({ data, pagesList, setPagesList, name, parsedData }) {
  const { t, i18n: { language } } = useTranslation();
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const [removePagesLayout, setRemovePagesLayout] = useState(false);
  const [addPagesLayout, setAddPagesLayout] = useState(false);
  const [reEvaluatePagesLayout, setReEvaluatePagesLayout] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [pagesSelected, setPagesSelected] = useState({});

  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const { pagesHeaders, columnsOptions, paginationButtonsTexts, nItemsPerPageText, itemsPaginationText } = getPagesSortingTable(t, name)

  const modalRemovePages = () => {
    setShowModal(!showModal)
    setRemovePagesLayout(!showModal)
  }

  const modalAddPages = () => {
    setShowModal(!showModal)
    setAddPagesLayout(!showModal)
  }

  const modalReEvaluatePages = () => {
    setShowModal(!showModal)
    setReEvaluatePagesLayout(!showModal)
    const processData = async () => {
      setLoading(true)
      if(api.isUserLoggedIn()) {
        await Promise.all(Object.keys(pagesSelected).map(async (key) => {
          const page = pagesSelected[key]
          const {response, err} = await api.reEvaluatePages({url: page.Uri})

          if(err && err.code && err.code === "ERR_NETWORK") {
            setError(t("MISC.unexpected_error") + " " + t("MISC.error_contact"));
            return err;
          }

          return;
        }));
        setLoading(false)
      } else {
        localStorage.removeItem('MM-username');
        localStorage.removeItem('MM-SSID');
        localStorage.removeItem('expires-at');
        localStorage.removeItem('websiteList')
        localStorage.removeItem('websiteListForWebsitePage')
        setLoading(false)
        navigate(`${pathURL}`)
      }
    }

    processData()
  }

  const closeModal = () => {
    setShowModal(false)
    setError(false)
    setRemovePagesLayout(false)
    setAddPagesLayout(false)
    setReEvaluatePagesLayout(false)
  }

  const removePages = async () => {
    if(api.isUserLoggedIn()) {
      const {response, err} = await api.removePages({website: name, pagesId: Object.keys(pagesSelected)})
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

  const getRemovePagesLayout = () => {
    return (
      <div className="modal_container d-flex flex-column justify-content-between p-4">
        <div className="d-flex flex-row justify-content-between align-items-center">
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
            <div>
              <p className="ama-typography-body-large mb-4">{t("PAGES.dialog.first_sentence")}</p>
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
    )
  }

  const getAddPagesLayout = () => {
    return (
      <div className="modal_container d-flex flex-column p-4">
        <div className="modal_container d-flex flex-row justify-content-between mb-5 align-items-center">
          <h2>{t("ADD_PAGES.title")}</h2>
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
      </div>
    )
  }

  const getReEvaluatePagesLayout = () => {
    return (
      <div className="modal_container d-flex flex-column p-4">
        <div className="d-flex flex-row justify-content-between mb-5 align-items-center">
          <h2>{t("PAGES.re_evaluate")}</h2>
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
        {!loading ? <p className="ama-typography-body-large">{!error ? t("ADD_PAGES.evaluations_dialog.message") : error}</p> : <LoadingComponent darkTheme={theme} loadingText={t("MISC.loading")} />}
      </div>
    )
  }

  return (
    <>
        <Modal
          isOpen={showModal}
          onRequestClose={() => closeModal()}
          contentLabel="Example Modal"
          className={theme === "light" ? "website_modal" : "website_modal_dark"}
          overlayClassName={theme === "light" ?"website_overlay_modal" : "website_overlay_modal_dark"}
        >
          {removePagesLayout && getRemovePagesLayout()}
          {addPagesLayout && getAddPagesLayout()}
          {reEvaluatePagesLayout && getReEvaluatePagesLayout()}
        </Modal>
        <div className="d-flex flex-column py-4 section_container pages_table">
            <div className="d-flex flex-row justify-content-between pages_container">
                <div>
                <h3 className="bold m-0">{t("PAGES.table.title")}</h3>
                <p className="ama-typography-body pb-4">{t("PAGES.table.subtitle")}</p>
                </div>
                <div className="d-flex flex-row gap-1 pages_actions">
                <Button
                    darkTheme={theme}
                    variant={"danger"}
                    text={t(`PAGES.remove_button`)}
                    disabled={Object.keys(pagesSelected).length < 1}
                    iconRight={<Icon name="AMA-Menus-Line" />}
                    onClick={() => modalRemovePages()}
                />
                <Button
                    darkTheme={theme}
                    variant={"success"}
                    text={t(`PAGES.add_button`)}
                    iconRight={<Icon name="AMA-Mais-Line" />}
                    onClick={() => modalAddPages()}
                />
                <Button
                    darkTheme={theme}
                    variant={"primary"}
                    text={t(`PAGES.re_evaluate`)}
                    disabled={Object.keys(pagesSelected).length < 1}
                    onClick={() => modalReEvaluatePages()}
                />
                </div>
            </div>
            {data && <SortingTable
                hasSort={true}
                headers={pagesHeaders}
                setDataList={setPagesList}
                dataList={pagesList}
                columnsOptions={columnsOptions}
                darkTheme={theme}
                links={true}
                caption={t("WEBSITE_TABLE.table.subtitle")}
                pagination={true}
                itemsPaginationTexts={itemsPaginationText}
                nItemsPerPageTexts={nItemsPerPageText}
                paginationButtonsTexts={paginationButtonsTexts}
                project={`${pathURL}`}
                setCheckboxesSelected={setPagesSelected}
            />}
            <div className="ama-typography-body mt-4 bold">{t("PAGES.table.note")}</div>
        </div>
    </>
  );
}
