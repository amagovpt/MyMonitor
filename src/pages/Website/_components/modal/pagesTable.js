
// Hooks
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Modal from 'react-modal';

// Dark / Light Theme Context
import { ThemeContext } from "../../../../context/ThemeContext";

import { SortingTable, Button, Icon } from "ama-design-system";

import { AddPagesSection } from './addPagesSection';

import { getPagesSortingTable } from "../../utils";
import { pathURL } from "../../../../App";
import { api } from '../../../../config/api'
import { ReEvaluateSection } from "./reEvaluateSection";
import { RemovePagesSection } from "./removePagesSection";

Modal.setAppElement('#root');

export function PagesTable({ data, pagesList, setPagesList, name, parsedData, mainTheme }) {
  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const [removePagesLayout, setRemovePagesLayout] = useState(false);
  const [addPagesLayout, setAddPagesLayout] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);

  
  const [showModal, setShowModal] = useState(false);
  const [showSecondModal, setShowSecondModal] = useState(false);
  const [pagesSelected, setPagesSelected] = useState([]);
  const [reEvaluatePagesLayout, setReEvaluatePagesLayout] = useState(false);

  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const { pagesHeaders, columnsOptions, paginationButtonsTexts, nItemsPerPageText, itemsPaginationText, ariaLabels } = getPagesSortingTable(t, name)


  const modalRemovePages = () => {
    setShowSecondModal(!showModal)
    setRemovePagesLayout(!showModal)
  }

  const modalAddPages = () => {
    setShowModal(!showModal)
    setAddPagesLayout(!showModal)
  }

  const modalReEvaluatePages = () => {
    setShowSecondModal(!showModal)
    setReEvaluatePagesLayout(!showModal)
    const processData = async () => {
      setLoading(true)
      if (api.isUserLoggedIn()) {
        await Promise.all(pagesSelected.map(async (pageSel) => {
          const { response, err } = await api.reEvaluatePages({ url: pageSel.Uri })
          if (err && err.code && err.code === "ERR_NETWORK") {
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

  const closeSecondModal = () => {
    setShowSecondModal(false)
    setError(false)
    setRemovePagesLayout(false)
    setReEvaluatePagesLayout(false)
  }
  const goToAddPages = () => {
    navigate("add-pages")
  }

  return (
    <>

        <Modal
          isOpen={showSecondModal}
          onRequestClose={() => closeSecondModal()}
          contentLabel={`${reEvaluatePagesLayout ? t("PAGES.re_evaluate") : removePagesLayout ? t("PAGES.dialog.title") : t("ADD_PAGES.title")}`}
          className={`${theme === "light" ? "second_website_modal" : "second_website_modal_dark"} modal_alert`}
          overlayClassName={theme === "light" ? "website_overlay_modal" : "website_overlay_modal_dark"}
        >
          {reEvaluatePagesLayout ?
            <ReEvaluateSection closeModal={closeSecondModal} loading={loading} error={error} />
            :
            (removePagesLayout ?
              <RemovePagesSection closeModal={closeSecondModal} error={error} name={name} pagesSelected={pagesSelected} setError={setError} setPagesList={setPagesList} parsedData={parsedData} setShowMessageModal={setShowMessageModal} />
              :
              <div className="modal_container d-flex flex-column p-4">
              </div>
            )
          }
        </Modal>
        <Modal
              isOpen={showMessageModal}
              onRequestClose={() => {setShowMessageModal(false)}}
              contentLabel={t("PAGES.dialog.title")}
              className={`${theme === "light" ? "second_website_modal" : "second_website_modal_dark"} modal_alert`}
              overlayClassName={theme === "light" ? "website_overlay_modal" : "website_overlay_modal_dark"}
            >
                  <div className="modal_container d-flex flex-column p-4">

                   <div className="d-flex flex-row justify-content-between mb-3 align-items-center">
          <h1>{t("PAGES.dialog.title")}</h1>
          <Button
            darkTheme={theme}
            variant={"secondary"}
            className={"close_modal"}
            aria-label={t(`ADD_PAGES.evaluations_dialog.close`)}
            text={t(`ADD_PAGES.evaluations_dialog.close`)}
            onClick={() => {setShowMessageModal(false)}}
            size={"lg"}
            iconRight={<Icon name="AMA-Erro2-Line" />}
          />
        </div>
          <h2 className="mt-4"> {t("ADD_PAGES.success_message_removed")}</h2>
        </div>
      </Modal>
      <div className="d-flex flex-column py-4 pages_table w-100">
        <div className="d-flex flex-row justify-content-between pages_container">
          <div>
            <h2 className="bold m-0">{t("PAGES.table.title")}</h2>
            <p className="ama-typography-body pb-4">{t("PAGES.table.subtitle")}</p>
            <p className="ama-typography-body pb-4">{`${pagesSelected.length} ${t("WEBSITE_TABLE.table.pages").toLocaleLowerCase()} ${t("ADD_PAGES.crawler.dialog.selected")}`}</p>
          </div>
          <div className="d-flex flex-row gap-1 pages_actions">
            <Button
              darkTheme={theme}
              variant={"success"}
              text={t(`PAGES.add_button`) +" "+t(`WEBSITE_TABLE.table.pages`).toLocaleLowerCase()}
              iconRight={<Icon name="AMA-Mais-Line" />}
              onClick={() => goToAddPages()}
            />
            <Button
              darkTheme={theme}
              variant={"primary"}
              text={`${t(`PAGES.re_evaluate`)} ${pagesSelected.length} ${t("WEBSITE_TABLE.table.pages").toLocaleLowerCase()}`}
              aria-disabled={pagesSelected.length < 1}
              onClick={() => modalReEvaluatePages()}
            />
            <Button
              darkTheme={theme}
              variant={"danger"}
              text={`${t(`PAGES.remove_button`)} ${pagesSelected.length} ${t("WEBSITE_TABLE.table.pages").toLocaleLowerCase()}`}
              aria-disabled={pagesSelected.length < 1}
              iconRight={<Icon name="AMA-Menus-Line" />}
              onClick={() => modalRemovePages()}
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
          ariaLabels={ariaLabels}
        />}
      </div>
    </>
  );
}
