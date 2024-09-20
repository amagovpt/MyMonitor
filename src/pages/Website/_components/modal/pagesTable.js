
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
  const [reEvaluatePagesLayout, setReEvaluatePagesLayout] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [pagesSelected, setPagesSelected] = useState([]);

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
        await Promise.all(pagesSelected.map(async (pageSel) => {
          const {response, err} = await api.reEvaluatePages({url: pageSel.Uri})
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

  return (
    <>
        <Modal
          isOpen={showModal}
          onRequestClose={() => closeModal()}
          contentLabel="Example Modal"
          className={theme === "light" ? "website_modal" : "website_modal_dark"}
          overlayClassName={theme === "light" ? "website_overlay_modal" : "website_overlay_modal_dark"}
        >
          {removePagesLayout && <RemovePagesSection closeModal={closeModal} error={error} name={name} pagesSelected={pagesSelected} setError={setError} setPagesList={setPagesList} parsedData={parsedData} />}
          {addPagesLayout && <AddPagesSection data={data} name={name} mainTheme={mainTheme} closeModal={closeModal} />}
          {reEvaluatePagesLayout && <ReEvaluateSection closeModal={closeModal} loading={loading} error={error} />}
        </Modal>
        <div className="d-flex flex-column py-4 pages_table w-100">
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
                    disabled={pagesSelected.length < 1}
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
                    disabled={pagesSelected.length < 1}
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
