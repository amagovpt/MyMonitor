import "./styles.css";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";

import { Breadcrumb, LoadingComponent, SortingTable, StatisticsHeader } from "ama-design-system";

import { RadarGraph } from "./_components/radarGraph";
import { BarLineGraphTabs } from "./_components/barLineGraphTabs";

import { getStatTitles } from "./utils";

export default function Website() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const name = null

  const { theme } = useContext(ThemeContext);
  const homeDark = theme === "light" ? "" : "website_dark";

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const { websiteStats, statsTitles } = getStatTitles(t)

  // Navigation options
  const breadcrumbs = [
    {
      title: t("HEADER.NAV.ecosystem"),
      href: "",
      onClick: () => navigate("/")
    },
    {
      title: t("HEADER.NAV.home"),
      href: "",
      onClick: () => navigate("/user")
    },
    {
      title: name
    }
  ];

  const radarData = [
    8.1,
    7.9,
    7.1,
    7.6,
    7.5,
    7.3,
    7.3,
    7.1,
    7.4,
    7.3,
  ]

  const barLineData = {
    scoreDistributionFrequency: [
        0,
        0,
        0,
        0,
        0,
        4,
        57,
        8,
        0
    ],
    nPages: 69
  }

  return (
    <>
      <div className={`container ${homeDark}`}>
        <div className="link_breadcrumb_container">
          <Breadcrumb data={breadcrumbs} darkTheme={theme} />
        </div>

        <div>
            <h2 className="bold my-2">{name}</h2>
        </div>
        {!loading ?
          <>
            {!error ?
              <>
                <section className={`bg-white px-5 py-2 mt-5 d-flex flex-row justify-content-between`}>
                  {websiteStats && <StatisticsHeader
                      darkTheme={theme}
                      stats={websiteStats}
                      statsTitles={statsTitles}
                      doubleRow={true}
                      title={t("WEBSITES_PAGE.statistics_title")}
                      subtitle={t("WEBSITES_PAGE.statistics_subtitle")}
                      oldestPage={t("STATISTICS.oldest_page_updated")}
                      newestPage={t("STATISTICS.newest_page_updated")}
                      gaugeTitle={t("STATISTICS.gauge.label")}
                      buttons={false}
                  />}
                </section>

                {/* Radar Graph */}
                <section className={`bg-white px-5 py-2 mt-4 d-flex flex-row justify-content-between`}>
                  <div className="d-flex flex-column section_container py-4">
                    <h3 className="bold">{t("PAGES.accessibility_plot.title")}</h3>
                    <div className="d-flex radar_graphic justify-content-center">
                      {radarData && <RadarGraph tempData={radarData} />}
                    </div>
                  </div>
                </section>

                {/* Bar+Line Graph */}
                <section className={`bg-white px-5 py-2 mt-4 d-flex flex-row justify-content-between`}>
                  <div className="d-flex flex-column section_container py-4">
                    <h3 className="bold mb-3">{t("DIALOGS.scores.title")}</h3>
                    {barLineData && <BarLineGraphTabs tempData={barLineData} websiteStats={websiteStats} />}
                  </div>
                </section>

                {/* Good / Bad section */}
                {/* <div className="good_bad">
                    {data && <Tabs tabs={tabsGoodBad} defaultActiveKey="tab1" vertical={false} />}
                </div> */}
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