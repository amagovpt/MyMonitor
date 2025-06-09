// Hooks
import { useContext, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

// Dark / Light Theme Context
import { ThemeContext } from "../../../context/ThemeContext";

// Components
import { SortingTable } from "ama-design-system";
import { TopTenTabs } from "./topTenTabs";

// Extra Data / Functions
import { getGoodBadTabTables } from "../utils"

export function GoodBadTab({ main_content_website, tempData, top10Data, color, goodOrBad, title }) {

  const { t, i18n: { language } } = useTranslation();

  // Theme
  const { theme } = useContext(ThemeContext);

  // Data for top 3 best practices for Good
  const [dataTableA, setDataTableA] = useState();
  const [dataTableAA, setDataTableAA] = useState();
  const [dataTableAAA, setDataTableAAA] = useState();

  // Data for table of all best practices
  const [detailsTable, setDetailsTable] = useState();
  const { dataTableHeadersA, dataTableHeadersAA, dataTableHeadersAAA, columnsOptionsAAs, detailsTableHeaders, columnsOptionsDetails, ariaLabels } = getGoodBadTabTables(t, goodOrBad)

  useEffect(() => {
    let tempDataTableA = []
    let tempDataTableAA = []
    let tempDataTableAAA = []
    let tempDetailsTable = []
    // Get the number for each practice in text format
    tempData.practicesData.map((value) => {
     
      let praticsPerPage = []
      value.quartiles.map((part) => {
        let text = ""
        if(part.int.lower === part.int.upper) {
          if(part.por === 100) {
            text = t(`WEBSITES_PAGE.table_best_practices.details.oneDetailAllPagesTogether`, {lower: part.int.lower})
          } else {
            text = t(`WEBSITES_PAGE.table_best_practices.details.sameDetailTogether`, {lower: part.int.lower, nPages: part.tot})
          }
        } else {
          text = t(`WEBSITES_PAGE.table_best_practices.details.multiDetailsTogether`, {lower: part.int.lower, upper: part.int.upper, nPages: part.tot})
        }
        praticsPerPage.push(text)
      })
      
      let singleOrPlural = 'p'
      if(value.nOccurrences === 1) singleOrPlural = 's'
      tempDetailsTable.push({name: t(`TESTS_RESULTS.${value.key}.${singleOrPlural}`), practices: praticsPerPage, pages: value.n_pages, occurences: value.nOccurrences, lvl:<><span className="visually-hidden">{t(`WEBSITES_PAGE.ariaLabels.${value.lvl}`)}</span> <span aria-hidden="true">{value.lvl}</span></>})
      switch(value.lvl) {
        case "A":
          if(tempDataTableA.length < 3) {
            let singleOrPlural = 'p'
            if(value.nOccurrences === 1) singleOrPlural = 's'
            tempDataTableA.push({
              number: tempDataTableA.length+1+".",
              name: t(`TESTS_RESULTS.${value.key}.${singleOrPlural}`, {value: value.nOccurrences}),
              nPages: [t(`WEBSITES_PAGE.${goodOrBad}.practice`) + " ", value.n_pages + " " + t(`WEBSITES_PAGE.${goodOrBad}.pages`)]
            })
          }
          break;
        case "AA":
          if(tempDataTableAA.length < 3) {
            let singleOrPlural = 'p'
            if(value.nOccurrences === 1) singleOrPlural = 's'
            tempDataTableAA.push({
              number: tempDataTableAA.length+1+".",
              name: t(`TESTS_RESULTS.${value.key}.${singleOrPlural}`, {value: value.nOccurrences}),
              nPages: [t(`WEBSITES_PAGE.${goodOrBad}.practice`) + " ", value.n_pages + " " + t(`WEBSITES_PAGE.${goodOrBad}.pages`)]
            })
          }
          break;
        case "AAA":
          if(tempDataTableAAA.length < 3) {
            let singleOrPlural = 'p'
            if(value.nOccurrences === 1) singleOrPlural = 's'
            tempDataTableAAA.push({
              number: tempDataTableAAA.length+1+".",
              name: t(`TESTS_RESULTS.${value.key}.${singleOrPlural}`, {value: value.nOccurrences}),
              nPages: [t(`WEBSITES_PAGE.${goodOrBad}.practice`) + " ", value.n_pages + " " + t(`WEBSITES_PAGE.${goodOrBad}.pages`)]
            })
          }
          break;
      }
    })
    setDataTableA(tempDataTableA)
    setDataTableAA(tempDataTableAA)
    setDataTableAAA(tempDataTableAAA)
    setDetailsTable(tempDetailsTable)
  }, [tempData, theme, language])

  return (
    <section
      className={`bg-white ${main_content_website} d-flex flex-row justify-content-center align-items-center goodBadSection`}
      tabIndex="0"
      aria-label={t("WEBSITES_PAGE.good_bad_section")}
    >
      <div className="d-flex flex-column section_container best_practises py-3 px-2">
        <h2 className="bold py-3 m-0" tabIndex="0">
          {title}
        </h2>
        
        {/* Top Ten Practices Graph/Table */}
        <div className="tabs_section" tabIndex="0" aria-label={t("WEBSITES_PAGE.top_ten_practices")}>
          <TopTenTabs top10Data={top10Data} color={color} aditionalData={tempData} title={title} ariaLabels={ariaLabels} />
        </div>

        {/* Tables for Practices, 3 per type and one general */}
        <h2 className="bold mt-5" tabIndex="0">{t(`WEBSITES_PAGE.${goodOrBad}.title`)}</h2>
        <p className="ama-typography-body-large mb-3" tabIndex="0">{t(`WEBSITES_PAGE.${goodOrBad}.subtitle`)}</p>
        <div className="light_tables" tabIndex="0" aria-label={t("WEBSITES_PAGE.practice_tables")}>
          <h3 className="mt-3 mb-2">{t(`WEBSITES_PAGE.table_best_practices.lvl_label`) + ": " + "A"} </h3>
          {dataTableA && <SortingTable
            hasSort={false}
            headers={dataTableHeadersA}
            dataList={dataTableA}
            columnsOptions={columnsOptionsAAs}
            darkTheme={theme}
            pagination={false}
            links={false}
            caption={t(`WEBSITES_PAGE.${goodOrBad}.message`, {value: "A"})}
          />}
          <h3 className="mt-3 mb-2">
            <span aria-hidden="true">{t(`WEBSITES_PAGE.table_best_practices.lvl_label`) + ": " + "AA"}</span>
            <span className="visually-hidden">{t(`WEBSITES_PAGE.table_best_practices.lvl_label`) + ": " +t("WEBSITES_PAGE.table_best_practices.double_a")}</span>
          </h3>
          {dataTableAA && <SortingTable
            hasSort={false}
            headers={dataTableHeadersAA}
            dataList={dataTableAA}
            columnsOptions={columnsOptionsAAs}
            darkTheme={theme}
            pagination={false}
            links={false}
            caption={t(`WEBSITES_PAGE.${goodOrBad}.message`, {value: "AA"})}
          />}
          <h3 className="mt-3 mb-2">
            <span aria-hidden="true">{t(`WEBSITES_PAGE.table_best_practices.lvl_label`) + ": " + "AAA"}</span>
            <span className="visually-hidden">{t(`WEBSITES_PAGE.table_best_practices.lvl_label`) + ": " +t("WEBSITES_PAGE.table_best_practices.triple_a")}</span>
          </h3>
          {dataTableAAA && <SortingTable
            hasSort={false}
            headers={dataTableHeadersAAA}
            dataList={dataTableAAA}
            columnsOptions={columnsOptionsAAs}
            darkTheme={theme}
            pagination={false}
            links={false}
            caption={t(`WEBSITES_PAGE.${goodOrBad}.message`, {value: "AAA"})}
          />}
        </div>
        <h2 className="bold mt-5 mb-3">{t(`WEBSITES_PAGE.table_best_practices.${goodOrBad}`)}</h2>
          {detailsTable && <SortingTable
            hasSort={false}
            headers={detailsTableHeaders}
            dataList={detailsTable}
            columnsOptions={columnsOptionsDetails}
            darkTheme={theme}
            pagination={false}
            links={false}
            caption={t(`WEBSITES_PAGE.table_best_practices.${goodOrBad}`)}
            ariaLabels={ariaLabels}
          />}
      </div>
    </section>
  );
}
