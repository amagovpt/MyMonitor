import "./styles.css";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Breadcrumb, LoadingComponent, SortingTable, Button, Icon } from "ama-design-system";
import { ThemeContext } from "../../context/ThemeContext";

import { pathURL } from "../../App";

// Extra Data / Functions
import { getDirectoryTable } from "./utils"

export default function Websites() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { theme } = useContext(ThemeContext);
  const homeDark = theme === "light" ? "" : "websites_dark";

  const dataRows = [
    {
      "id": 22,
      "rank": 1,
      "name": "Portal Mais Transparência",
      "entity": "Agência para a Modernização Administrativa",
      "declaration": 3,
      "stamp": 3,
      "score": 9.937837837837838,
      "nPages": 37,
      "A": 0,
      "AA": 6,
      "AAA": 31
    },
    {
      "id": 23,
      "rank": 2,
      "name": "Instituto da Segurança Social, I.P. - Portal Seg Social",
      "entity": "Instituto da Segurança Social, I.P.",
      "declaration": null,
      "stamp": null,
      "score": 9.63908045977012,
      "nPages": 87,
      "A": 0,
      "AA": 33,
      "AAA": 22
    },
    {
      "id": 31,
      "rank": 3,
      "name": "Portal do SNS 24",
      "entity": "Serviços Partilhados do Ministério da Saúde, E.P.E.",
      "declaration": null,
      "stamp": null,
      "score": 9.54666666666667,
      "nPages": 30,
      "A": 13,
      "AA": 0,
      "AAA": 0
    }
  ]

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [directoriesList, setDirectoriesList] = useState(dataRows);

  // Data and Options for the Tables on this page
  const { directoriesHeaders, columnsOptions, nameOfIcons, paginationButtonsTexts, nItemsPerPageText, itemsPaginationText } = getDirectoryTable(t, navigate)

  // Navigation options
  const breadcrumbs = [
    {
      title: t("HEADER.NAV.ecosystem"),
      href: "",
      onClick: () => navigate(`${pathURL}`)
    },
    {
      title: t("HEADER.NAV.home")
    }
  ];

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
            onClick={() => navigate(`${pathURL}`)}
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
                      <h3 className="bold m-0">{t("WEBSITE_TABLE.table.title")}</h3>
                      <p className="ama-typography-body pb-4">{t("WEBSITE_TABLE.table.subtitle")}</p>
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
                      />}
                      <div className="ama-typography-body mt-4">{t("WEBSITE_TABLE.table.note")}</div>
                    </div>
                  </section>
                : <h3 className="text-center mt-5 bold">{t("WEBSITE_TABLE.no_websites")}</h3>}
              </>
            : <>
                <h3 className="text-center mt-5 bold">{t("MISC.unexpected_error")}</h3>
                <h3 className="text-center mt-5 bold">{t("MISC.error_contact")}</h3>
              </>
            }
          </>
        : <LoadingComponent darkTheme={theme} loadingText={t("MISC.loading")} />}
      </div>
    </>
  );
}