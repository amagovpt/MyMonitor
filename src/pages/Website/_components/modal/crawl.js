
// Hooks
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Modal from 'react-modal';

// Dark / Light Theme Context
import { ThemeContext } from "../../../../context/ThemeContext";

import { Button, Icon, SortingTable } from "ama-design-system";

import { getResultsTable } from '../../utils'

import { api } from '../../../../config/api'

import { urlValidator } from '../../utils'

export function Crawl({ data, name, setShowSecondModal, closeModal }) {
  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext);

  const [status, setStatus] = useState("not_running")
  const [error, setError] = useState(false);
  const [showResultsModal, setShowResultsModal] = useState(false)

  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState([]);

  const { resultsHeader, columnsOptions } = getResultsTable(t)

  useEffect(() => {
    const fetchData = async () => {
      const {response, err} = await api.addPageCrawlCheck(data.startingUrl);
      if (response && response.data.success === 1 && response.data.result === true && !(err && err.code)) {
        localStorage.setItem("crawler_status", 'complete')
        setStatus('complete')
      } else {
        const prevStatus = localStorage.getItem("crawler_status")
        if(prevStatus) {
          setStatus(prevStatus)
        }
      }
    }
    fetchData()
  }, [])

  const startCrawler = async () => {
    const {response, err} = await api.addPageCrawl(data.startingUrl);
    if(err && err.code && err.code === "ERR_NETWORK") {
      setError(t("MISC.unexpected_error") + " " + t("MISC.error_contact"));
    } else if (response && response.data.success === 1) {
      setStatus('inProgress')
      localStorage.setItem("crawler_status", 'inProgress')
    }
  }

  const viewResults = async () => {
    const {response, err} = await api.addPageCrawlResults(data.startingUrl);
    if(err && err.code && err.code === "ERR_NETWORK") {
      setError(t("MISC.unexpected_error") + " " + t("MISC.error_contact"));
    } else if (response && response.data.success === 1) {
      const updatedList = response.data.result.map((item) => {
        const { CrawlId, ...rest } = item;
        return { id: CrawlId, ...rest };
      })
      setResults(updatedList)
      setShowResultsModal(true)
    }
  }

  const deleteData = async () => {
    const {response, err} = await api.addPageCrawlDelete(data.startingUrl);
    if(err && err.code && err.code === "ERR_NETWORK") {
      setError(t("MISC.unexpected_error") + " " + t("MISC.error_contact"));
    } else if (response && response.data.success === 1) {
      setStatus('not_running')
      localStorage.setItem("crawler_status", 'not_running')
    }
  }

  const addPages = async () => {
    const arrayOfUris = selected.map(obj => obj.Uri);
    const {invalid, cleanedUrls} = urlValidator(t, arrayOfUris, data.startingUrl)
    if(invalid === "") {
      setError("")
      const {response, err} = await api.addPageCreate(cleanedUrls, data.startingUrl, name)
      if(err && err.code && err.code === "ERR_NETWORK") {
        setError(t("MISC.unexpected_error") + " " + t("MISC.error_contact"));
      } else if (response && response.data.success === 1) {
        setShowSecondModal(true)
        closeModal()
        setShowResultsModal(false)
      }
    }
  }

  return (
    <>
      <Modal
        isOpen={showResultsModal}
        onRequestClose={() => setShowResultsModal(false)}
        contentLabel="Results modal"
        className={theme === "light" ? "website_modal" : "website_modal_dark"}
        overlayClassName={theme === "light" ?"website_overlay_modal" : "website_overlay_modal_dark"}
      >
        <div className="modal_container d-flex flex-column p-4">
          <div className="d-flex flex-row justify-content-between mb-3 align-items-center">
            <h2>{t("ADD_PAGES.crawler.dialog.title")}</h2>
            <Button
              darkTheme={theme}
              variant={"secondary"}
              className={"close_modal"}
              aria-label={t(`ADD_PAGES.evaluations_dialog.close`)}
              text={t(`ADD_PAGES.evaluations_dialog.close`)}
              onClick={() => setShowResultsModal(false)}
              size={"lg"}
              iconRight={<Icon name="AMA-Erro2-Line" />}
            />
          </div>
          <p className="p-3 mb-0 results_subtitle bold">{t("ADD_PAGES.crawler.dialog.subtitle")}</p>
          <div className="results_table_container">
            <SortingTable
              hasSort={false}
              headers={resultsHeader}
              dataList={results}
              darkTheme={theme}
              pagination={false}
              links={true}
              caption={t("ADD_PAGES.crawler.dialog.table.caption")}
              columnsOptions={columnsOptions}
              setCheckboxesSelected={setSelected}
            />
          </div>
          <div className="d-flex flex-row justify-content-between mt-3">
            <p>{t("ADD_PAGES.crawler.dialog.selected") + selected.length + t("PAGES.table.paginator.of") + results.length + " " + t("WEBSITES_PAGE.top_3_bad_practices.pages")}</p>
            <Button
              darkTheme={theme}
              variant={"primary"}
              text={t(`ADD_PAGES.button`)}
              onClick={() => addPages()}
              size={"lg"}
              disabled={!selected || selected.length < 1}
              iconRight={<Icon name="AMA-Setalongaoficial-Line" />}
            />
          </div>
        </div>
      </Modal>
      <div className="d-flex flex-row justify-content-start align-items-center gap-4 crawl_actions">
        <div>
          {t("ADD_PAGES.crawler.status")}
          <span>{t(`ADD_PAGES.crawler.${status}`)}</span>
        </div>
        <Button
          darkTheme={theme}
          variant={"primary"}
          text={t(`ADD_PAGES.crawler.crawl_button`)}
          size={"lg"}
          onClick={startCrawler}
        />
        <Button
          darkTheme={theme}
          variant={"success"}
          text={t(`ADD_PAGES.crawler.results_button`)}
          size={"lg"}
          disabled={status === 'complete' ? false : true}
          onClick={viewResults}
        />
        <Button
          darkTheme={theme}
          variant={"danger"}
          text={t(`ADD_PAGES.crawler.delete_button`)}
          size={"lg"}
          disabled={status === 'complete' ? false : true}
          onClick={deleteData}
        />
      </div>
      {error && <p>{error}</p>}
    </>
  );
}
