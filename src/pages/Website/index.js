import "./styles.css";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";

import { Breadcrumb, LoadingComponent, SortingTable, StatisticsHeader, Button, Icon, Tabs } from "ama-design-system";

import { RadarGraph } from "./_components/radarGraph";
import { BarLineGraphTabs } from "./_components/barLineGraphTabs";
import { GoodBadTab } from "./_components/goodBadTab";

import { getStatTitles } from "./utils";

import { pathURL } from "../../App";

export default function Website() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const name = decodeURIComponent(location.pathname.split("/")[2]) || null

  const { theme } = useContext(ThemeContext);
  const websiteDark = theme === "light" ? "" : "website_dark";

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const [data, setData] = useState(null);

  const { websiteStats, statsTitles } = getStatTitles(t)

  // Navigation options
  const breadcrumbs = [
    {
      title: t("HEADER.NAV.ecosystem"),
      href: "",
      onClick: () => navigate(`${pathURL}`)
    },
    {
      title: t("HEADER.NAV.home"),
      href: "",
      onClick: () => navigate(`${pathURL}user`)
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

  const successDetailsTable = {
    "practicesKeys": [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20",
      "21",
      "22",
      "23",
      "24",
      "25",
      "26",
      "27",
      "28",
      "29",
      "30",
      "31"
    ],
    "practicesData": [
      {
        "key": "aria_07",
        "n_occurrences": 35371,
        "n_pages": 69,
        "lvl": "A",
        "quartiles": [
          {
            "tot": 34,
            "por": 49,
            "int": {
              "lower": 471,
              "upper": 492
            }
          },
          {
            "tot": 3,
            "por": 4,
            "int": {
              "lower": 493,
              "upper": 493
            }
          },
          {
            "tot": 18,
            "por": 26,
            "int": {
              "lower": 494,
              "upper": 516
            }
          },
          {
            "tot": 14,
            "por": 20,
            "int": {
              "lower": 518,
              "upper": 760
            }
          }
        ]
      },
      {
        "key": "listitem_01",
        "n_occurrences": 33388,
        "n_pages": 69,
        "lvl": "AA",
        "quartiles": [
          {
            "tot": 21,
            "por": 30,
            "int": {
              "lower": 383,
              "upper": 386
            }
          },
          {
            "tot": 20,
            "por": 29,
            "int": {
              "lower": 387,
              "upper": 396
            }
          },
          {
            "tot": 12,
            "por": 17,
            "int": {
              "lower": 397,
              "upper": 424
            }
          },
          {
            "tot": 16,
            "por": 23,
            "int": {
              "lower": 425,
              "upper": 5618
            }
          }
        ]
      },
      {
        "key": "element_08",
        "n_occurrences": 33166,
        "n_pages": 69,
        "lvl": "A",
        "quartiles": [
          {
            "tot": 25,
            "por": 36,
            "int": {
              "lower": 435,
              "upper": 457
            }
          },
          {
            "tot": 11,
            "por": 16,
            "int": {
              "lower": 458,
              "upper": 472
            }
          },
          {
            "tot": 17,
            "por": 25,
            "int": {
              "lower": 473,
              "upper": 482
            }
          },
          {
            "tot": 16,
            "por": 23,
            "int": {
              "lower": 486,
              "upper": 635
            }
          }
        ]
      },
      {
        "key": "element_02",
        "n_occurrences": 6067,
        "n_pages": 69,
        "lvl": "A",
        "quartiles": [
          {
            "tot": 39,
            "por": 57,
            "int": {
              "lower": 79,
              "upper": 79
            }
          },
          {
            "tot": 19,
            "por": 28,
            "int": {
              "lower": 80,
              "upper": 93
            }
          },
          {
            "tot": 11,
            "por": 16,
            "int": {
              "lower": 96,
              "upper": 195
            }
          }
        ]
      },
      {
        "key": "aria_03",
        "n_occurrences": 1828,
        "n_pages": 69,
        "lvl": "A",
        "quartiles": [
          {
            "tot": 33,
            "por": 48,
            "int": {
              "lower": 17,
              "upper": 20
            }
          },
          {
            "tot": 3,
            "por": 4,
            "int": {
              "lower": 21,
              "upper": 21
            }
          },
          {
            "tot": 21,
            "por": 30,
            "int": {
              "lower": 22,
              "upper": 27
            }
          },
          {
            "tot": 12,
            "por": 17,
            "int": {
              "lower": 28,
              "upper": 112
            }
          }
        ]
      },
      {
        "key": "role_01",
        "n_occurrences": 1144,
        "n_pages": 69,
        "lvl": "AA",
        "quartiles": [
          {
            "tot": 31,
            "por": 45,
            "int": {
              "lower": 7,
              "upper": 10
            }
          },
          {
            "tot": 8,
            "por": 12,
            "int": {
              "lower": 11,
              "upper": 11
            }
          },
          {
            "tot": 17,
            "por": 25,
            "int": {
              "lower": 12,
              "upper": 21
            }
          },
          {
            "tot": 13,
            "por": 19,
            "int": {
              "lower": 22,
              "upper": 55
            }
          }
        ]
      },
      {
        "key": "element_10",
        "n_occurrences": 788,
        "n_pages": 69,
        "lvl": "A",
        "quartiles": [
          {
            "tot": 37,
            "por": 54,
            "int": {
              "lower": 6,
              "upper": 7
            }
          },
          {
            "tot": 16,
            "por": 23,
            "int": {
              "lower": 8,
              "upper": 10
            }
          },
          {
            "tot": 16,
            "por": 23,
            "int": {
              "lower": 11,
              "upper": 54
            }
          }
        ]
      },
      {
        "key": "element_04",
        "n_occurrences": 449,
        "n_pages": 69,
        "lvl": "A",
        "quartiles": [
          {
            "tot": 42,
            "por": 61,
            "int": {
              "lower": 1,
              "upper": 4
            }
          },
          {
            "tot": 11,
            "por": 16,
            "int": {
              "lower": 5,
              "upper": 6
            }
          },
          {
            "tot": 16,
            "por": 23,
            "int": {
              "lower": 7,
              "upper": 34
            }
          }
        ]
      },
      {
        "key": "landmark_11",
        "n_occurrences": 207,
        "n_pages": 69,
        "lvl": "AA",
        "quartiles": [
          {
            "tot": 69,
            "por": 100,
            "int": {
              "lower": 3,
              "upper": 3
            }
          }
        ]
      },
      {
        "key": "element_06",
        "n_occurrences": 79,
        "n_pages": 69,
        "lvl": "AA",
        "quartiles": [
          {
            "tot": 65,
            "por": 94,
            "int": {
              "lower": 1,
              "upper": 1
            }
          },
          {
            "tot": 4,
            "por": 6,
            "int": {
              "lower": 3,
              "upper": 4
            }
          }
        ]
      },
      {
        "key": "title_06",
        "n_occurrences": 69,
        "n_pages": 69,
        "lvl": "A",
        "quartiles": [
          {
            "tot": 69,
            "por": 100,
            "int": {
              "lower": 1,
              "upper": 1
            }
          }
        ]
      },
      {
        "key": "meta_05",
        "n_occurrences": 69,
        "n_pages": 69,
        "lvl": "AA",
        "quartiles": [
          {
            "tot": 69,
            "por": 100,
            "int": {
              "lower": 1,
              "upper": 1
            }
          }
        ]
      },
      {
        "key": "form_01a",
        "n_occurrences": 69,
        "n_pages": 69,
        "lvl": "A",
        "quartiles": [
          {
            "tot": 69,
            "por": 100,
            "int": {
              "lower": 1,
              "upper": 1
            }
          }
        ]
      },
      {
        "key": "layout_01a",
        "n_occurrences": 69,
        "n_pages": 69,
        "lvl": "A",
        "quartiles": [
          {
            "tot": 69,
            "por": 100,
            "int": {
              "lower": 1,
              "upper": 1
            }
          }
        ]
      },
      {
        "key": "landmark_05",
        "n_occurrences": 69,
        "n_pages": 69,
        "lvl": "AA",
        "quartiles": [
          {
            "tot": 69,
            "por": 100,
            "int": {
              "lower": 1,
              "upper": 1
            }
          }
        ]
      },
      {
        "key": "input_02b",
        "n_occurrences": 68,
        "n_pages": 68,
        "lvl": "A",
        "quartiles": [
          {
            "tot": 68,
            "por": 100,
            "int": {
              "lower": 1,
              "upper": 1
            }
          }
        ]
      },
      {
        "key": "list_02",
        "n_occurrences": 2369,
        "n_pages": 67,
        "lvl": "AA",
        "quartiles": [
          {
            "tot": 24,
            "por": 36,
            "int": {
              "lower": 27,
              "upper": 28
            }
          },
          {
            "tot": 15,
            "por": 22,
            "int": {
              "lower": 29,
              "upper": 30
            }
          },
          {
            "tot": 13,
            "por": 19,
            "int": {
              "lower": 31,
              "upper": 40
            }
          },
          {
            "tot": 15,
            "por": 22,
            "int": {
              "lower": 42,
              "upper": 102
            }
          }
        ]
      },
      {
        "key": "a_10",
        "n_occurrences": 3814,
        "n_pages": 65,
        "lvl": "A",
        "quartiles": [
          {
            "tot": 19,
            "por": 29,
            "int": {
              "lower": 33,
              "upper": 42
            }
          },
          {
            "tot": 16,
            "por": 25,
            "int": {
              "lower": 43,
              "upper": 51
            }
          },
          {
            "tot": 16,
            "por": 25,
            "int": {
              "lower": 53,
              "upper": 73
            }
          },
          {
            "tot": 14,
            "por": 22,
            "int": {
              "lower": 77,
              "upper": 122
            }
          }
        ]
      },
      {
        "key": "heading_01",
        "n_occurrences": 808,
        "n_pages": 64,
        "lvl": "A",
        "quartiles": [
          {
            "tot": 21,
            "por": 33,
            "int": {
              "lower": 3,
              "upper": 6
            }
          },
          {
            "tot": 15,
            "por": 23,
            "int": {
              "lower": 7,
              "upper": 9
            }
          },
          {
            "tot": 21,
            "por": 33,
            "int": {
              "lower": 10,
              "upper": 17
            }
          },
          {
            "tot": 7,
            "por": 11,
            "int": {
              "lower": 23,
              "upper": 56
            }
          }
        ]
      },
      {
        "key": "aria_05",
        "n_occurrences": 1322,
        "n_pages": 57,
        "lvl": "A",
        "quartiles": [
          {
            "tot": 33,
            "por": 58,
            "int": {
              "lower": 17,
              "upper": 20
            }
          },
          {
            "tot": 12,
            "por": 21,
            "int": {
              "lower": 21,
              "upper": 24
            }
          },
          {
            "tot": 12,
            "por": 21,
            "int": {
              "lower": 26,
              "upper": 66
            }
          }
        ]
      },
      {
        "key": "img_01a",
        "n_occurrences": 55,
        "n_pages": 55,
        "lvl": "A",
        "quartiles": [
          {
            "tot": 55,
            "por": 100,
            "int": {
              "lower": 1,
              "upper": 1
            }
          }
        ]
      },
      {
        "key": "svg_01",
        "n_occurrences": 133,
        "n_pages": 51,
        "lvl": "A",
        "quartiles": [
          {
            "tot": 51,
            "por": 100,
            "int": {
              "lower": 1,
              "upper": 3
            }
          }
        ]
      },
      {
        "key": "landmark_13",
        "n_occurrences": 75,
        "n_pages": 25,
        "lvl": "AA",
        "quartiles": [
          {
            "tot": 25,
            "por": 100,
            "int": {
              "lower": 3,
              "upper": 3
            }
          }
        ]
      },
      {
        "key": "landmark_07",
        "n_occurrences": 25,
        "n_pages": 25,
        "lvl": "AA",
        "quartiles": [
          {
            "tot": 25,
            "por": 100,
            "int": {
              "lower": 1,
              "upper": 1
            }
          }
        ]
      },
      {
        "key": "textC_01",
        "n_occurrences": 340,
        "n_pages": 8,
        "lvl": "AAA",
        "quartiles": [
          {
            "tot": 3,
            "por": 38,
            "int": {
              "lower": 19,
              "upper": 19
            }
          },
          {
            "tot": 1,
            "por": 13,
            "int": {
              "lower": 23,
              "upper": 23
            }
          },
          {
            "tot": 3,
            "por": 38,
            "int": {
              "lower": 27,
              "upper": 51
            }
          },
          {
            "tot": 1,
            "por": 13,
            "int": {
              "lower": 131,
              "upper": 131
            }
          }
        ]
      },
      {
        "key": "table_07",
        "n_occurrences": 24,
        "n_pages": 4,
        "lvl": "A",
        "quartiles": [
          {
            "tot": 2,
            "por": 50,
            "int": {
              "lower": 3,
              "upper": 3
            }
          },
          {
            "tot": 2,
            "por": 50,
            "int": {
              "lower": 9,
              "upper": 9
            }
          }
        ]
      },
      {
        "key": "a_12",
        "n_occurrences": 10,
        "n_pages": 4,
        "lvl": "A",
        "quartiles": [
          {
            "tot": 2,
            "por": 50,
            "int": {
              "lower": 1,
              "upper": 1
            }
          },
          {
            "tot": 2,
            "por": 50,
            "int": {
              "lower": 4,
              "upper": 4
            }
          }
        ]
      },
      {
        "key": "aria_01",
        "n_occurrences": 8,
        "n_pages": 4,
        "lvl": "A",
        "quartiles": [
          {
            "tot": 2,
            "por": 50,
            "int": {
              "lower": 1,
              "upper": 1
            }
          },
          {
            "tot": 2,
            "por": 50,
            "int": {
              "lower": 3,
              "upper": 3
            }
          }
        ]
      },
      {
        "key": "aria_02",
        "n_occurrences": 4,
        "n_pages": 4,
        "lvl": "A",
        "quartiles": [
          {
            "tot": 4,
            "por": 100,
            "int": {
              "lower": 1,
              "upper": 1
            }
          }
        ]
      },
      {
        "key": "w3c_validator_01a",
        "n_occurrences": 2,
        "n_pages": 2,
        "lvl": "A",
        "quartiles": [
          {
            "tot": 2,
            "por": 100,
            "int": {
              "lower": 1,
              "upper": 1
            }
          }
        ]
      },
      {
        "key": "list_04",
        "n_occurrences": 2,
        "n_pages": 1,
        "lvl": "AAA",
        "quartiles": [
          {
            "tot": 1,
            "por": 100,
            "int": {
              "lower": 2,
              "upper": 2
            }
          }
        ]
      },
      {
        "key": "list_06",
        "n_occurrences": 1,
        "n_pages": 1,
        "lvl": "AAA",
        "quartiles": [
          {
            "tot": 1,
            "por": 100,
            "int": {
              "lower": 1,
              "upper": 1
            }
          }
        ]
      }
    ]
  }

  const errorsDetailsTable = {
    "practicesKeys": [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20",
      "21",
      "22",
      "23"
    ],
    "practicesData": [
      {
        "key": "id_02",
        "n_occurrences": 1147,
        "n_pages": 69,
        "lvl": "A",
        "quartiles": [
          {
            "tot": 45,
            "por": 65,
            "int": {
              "lower": 15,
              "upper": 15
            }
          },
          {
            "tot": 8,
            "por": 12,
            "int": {
              "lower": 16,
              "upper": 17
            }
          },
          {
            "tot": 16,
            "por": 23,
            "int": {
              "lower": 18,
              "upper": 28
            }
          }
        ]
      },
      {
        "key": "hx_03",
        "n_occurrences": 744,
        "n_pages": 69,
        "lvl": "AAA",
        "quartiles": [
          {
            "tot": 42,
            "por": 61,
            "int": {
              "lower": 9,
              "upper": 9
            }
          },
          {
            "tot": 23,
            "por": 33,
            "int": {
              "lower": 12,
              "upper": 12
            }
          },
          {
            "tot": 4,
            "por": 6,
            "int": {
              "lower": 15,
              "upper": 30
            }
          }
        ]
      },
      {
        "key": "button_02",
        "n_occurrences": 207,
        "n_pages": 69,
        "lvl": "A",
        "quartiles": [
          {
            "tot": 69,
            "por": 100,
            "int": {
              "lower": 3,
              "upper": 3
            }
          }
        ]
      },
      {
        "key": "landmark_02",
        "n_occurrences": 207,
        "n_pages": 69,
        "lvl": "AA",
        "quartiles": [
          {
            "tot": 69,
            "por": 100,
            "int": {
              "lower": 3,
              "upper": 3
            }
          }
        ]
      },
      {
        "key": "table_02",
        "n_occurrences": 81,
        "n_pages": 69,
        "lvl": "A",
        "quartiles": [
          {
            "tot": 65,
            "por": 94,
            "int": {
              "lower": 1,
              "upper": 1
            }
          },
          {
            "tot": 4,
            "por": 6,
            "int": {
              "lower": 3,
              "upper": 5
            }
          }
        ]
      },
      {
        "key": "landmark_10",
        "n_occurrences": 69,
        "n_pages": 69,
        "lvl": "AA",
        "quartiles": [
          {
            "tot": 69,
            "por": 100,
            "int": {
              "lower": 1,
              "upper": 1
            }
          }
        ]
      },
      {
        "key": "landmark_04",
        "n_occurrences": 69,
        "n_pages": 69,
        "lvl": "AA",
        "quartiles": [
          {
            "tot": 69,
            "por": 100,
            "int": {
              "lower": 1,
              "upper": 1
            }
          }
        ]
      },
      {
        "key": "ehandler_02",
        "n_occurrences": 286,
        "n_pages": 54,
        "lvl": "A",
        "quartiles": [
          {
            "tot": 52,
            "por": 96,
            "int": {
              "lower": 3,
              "upper": 5
            }
          },
          {
            "tot": 2,
            "por": 4,
            "int": {
              "lower": 14,
              "upper": 14
            }
          }
        ]
      },
      {
        "key": "label_03",
        "n_occurrences": 51,
        "n_pages": 51,
        "lvl": "A",
        "quartiles": [
          {
            "tot": 51,
            "por": 100,
            "int": {
              "lower": 1,
              "upper": 1
            }
          }
        ]
      },
      {
        "key": "landmark_14",
        "n_occurrences": 44,
        "n_pages": 44,
        "lvl": "AA",
        "quartiles": [
          {
            "tot": 44,
            "por": 100,
            "int": {
              "lower": 1,
              "upper": 1
            }
          }
        ]
      },
      {
        "key": "landmark_08",
        "n_occurrences": 44,
        "n_pages": 44,
        "lvl": "AA",
        "quartiles": [
          {
            "tot": 44,
            "por": 100,
            "int": {
              "lower": 1,
              "upper": 1
            }
          }
        ]
      },
      {
        "key": "svg_02",
        "n_occurrences": 202,
        "n_pages": 18,
        "lvl": "A",
        "quartiles": [
          {
            "tot": 6,
            "por": 33,
            "int": {
              "lower": 1,
              "upper": 1
            }
          },
          {
            "tot": 4,
            "por": 22,
            "int": {
              "lower": 3,
              "upper": 8
            }
          },
          {
            "tot": 4,
            "por": 22,
            "int": {
              "lower": 10,
              "upper": 10
            }
          },
          {
            "tot": 4,
            "por": 22,
            "int": {
              "lower": 20,
              "upper": 47
            }
          }
        ]
      },
      {
        "key": "img_01b",
        "n_occurrences": 152,
        "n_pages": 14,
        "lvl": "A",
        "quartiles": [
          {
            "tot": 6,
            "por": 43,
            "int": {
              "lower": 1,
              "upper": 1
            }
          },
          {
            "tot": 4,
            "por": 29,
            "int": {
              "lower": 3,
              "upper": 3
            }
          },
          {
            "tot": 2,
            "por": 14,
            "int": {
              "lower": 20,
              "upper": 20
            }
          },
          {
            "tot": 2,
            "por": 14,
            "int": {
              "lower": 47,
              "upper": 47
            }
          }
        ]
      },
      {
        "key": "aria_06",
        "n_occurrences": 104,
        "n_pages": 12,
        "lvl": "A",
        "quartiles": [
          {
            "tot": 10,
            "por": 83,
            "int": {
              "lower": 1,
              "upper": 1
            }
          },
          {
            "tot": 2,
            "por": 17,
            "int": {
              "lower": 47,
              "upper": 47
            }
          }
        ]
      },
      {
        "key": "color_02",
        "n_occurrences": 51,
        "n_pages": 11,
        "lvl": "AA",
        "quartiles": [
          {
            "tot": 5,
            "por": 45,
            "int": {
              "lower": 1,
              "upper": 1
            }
          },
          {
            "tot": 2,
            "por": 18,
            "int": {
              "lower": 3,
              "upper": 3
            }
          },
          {
            "tot": 4,
            "por": 36,
            "int": {
              "lower": 10,
              "upper": 10
            }
          }
        ]
      },
      {
        "key": "heading_02",
        "n_occurrences": 23,
        "n_pages": 5,
        "lvl": "A",
        "quartiles": [
          {
            "tot": 3,
            "por": 60,
            "int": {
              "lower": 1,
              "upper": 1
            }
          },
          {
            "tot": 2,
            "por": 40,
            "int": {
              "lower": 10,
              "upper": 10
            }
          }
        ]
      },
      {
        "key": "a_11",
        "n_occurrences": 8,
        "n_pages": 4,
        "lvl": "A",
        "quartiles": [
          {
            "tot": 2,
            "por": 50,
            "int": {
              "lower": 1,
              "upper": 1
            }
          },
          {
            "tot": 2,
            "por": 50,
            "int": {
              "lower": 3,
              "upper": 3
            }
          }
        ]
      },
      {
        "key": "ehandler_04",
        "n_occurrences": 27,
        "n_pages": 3,
        "lvl": "A",
        "quartiles": [
          {
            "tot": 1,
            "por": 33,
            "int": {
              "lower": 3,
              "upper": 3
            }
          },
          {
            "tot": 2,
            "por": 67,
            "int": {
              "lower": 12,
              "upper": 12
            }
          }
        ]
      },
      {
        "key": "a_06",
        "n_occurrences": 6,
        "n_pages": 2,
        "lvl": "A",
        "quartiles": [
          {
            "tot": 2,
            "por": 100,
            "int": {
              "lower": 3,
              "upper": 3
            }
          }
        ]
      },
      {
        "key": "focus_01",
        "n_occurrences": 2,
        "n_pages": 2,
        "lvl": "A",
        "quartiles": [
          {
            "tot": 2,
            "por": 100,
            "int": {
              "lower": 1,
              "upper": 1
            }
          }
        ]
      },
      {
        "key": "br_01",
        "n_occurrences": 2,
        "n_pages": 2,
        "lvl": "A",
        "quartiles": [
          {
            "tot": 2,
            "por": 100,
            "int": {
              "lower": 1,
              "upper": 1
            }
          }
        ]
      },
      {
        "key": "list_03",
        "n_occurrences": 2,
        "n_pages": 2,
        "lvl": "AA",
        "quartiles": [
          {
            "tot": 2,
            "por": 100,
            "int": {
              "lower": 1,
              "upper": 1
            }
          }
        ]
      },
      {
        "key": "a_05",
        "n_occurrences": 12,
        "n_pages": 1,
        "lvl": "A",
        "quartiles": [
          {
            "tot": 1,
            "por": 100,
            "int": {
              "lower": 12,
              "upper": 12
            }
          }
        ]
      },
      {
        "key": "input_02",
        "n_occurrences": 1,
        "n_pages": 1,
        "lvl": "A",
        "quartiles": [
          {
            "tot": 1,
            "por": 100,
            "int": {
              "lower": 1,
              "upper": 1
            }
          }
        ]
      }
    ]
  }

  const bestPracticesDistribution = [
    {
      "key": "aria_07",
      "n_occurrences": 35371,
      "n_pages": 69
    },
    {
      "key": "listitem_01",
      "n_occurrences": 33388,
      "n_pages": 69
    },
    {
      "key": "element_08",
      "n_occurrences": 33166,
      "n_pages": 69
    },
    {
      "key": "element_02",
      "n_occurrences": 6067,
      "n_pages": 69
    },
    {
      "key": "a_10",
      "n_occurrences": 3814,
      "n_pages": 65
    },
    {
      "key": "list_02",
      "n_occurrences": 2369,
      "n_pages": 67
    },
    {
      "key": "aria_03",
      "n_occurrences": 1828,
      "n_pages": 69
    },
    {
      "key": "aria_05",
      "n_occurrences": 1322,
      "n_pages": 57
    },
    {
      "key": "role_01",
      "n_occurrences": 1144,
      "n_pages": 69
    },
    {
      "key": "heading_01",
      "n_occurrences": 808,
      "n_pages": 64
    }
  ]

  const errorsDistribution = [
    {
      "key": "id_02",
      "n_occurrences": 1147,
      "n_pages": 69
    },
    {
      "key": "hx_03",
      "n_occurrences": 744,
      "n_pages": 69
    },
    {
      "key": "ehandler_02",
      "n_occurrences": 286,
      "n_pages": 54
    },
    {
      "key": "button_02",
      "n_occurrences": 207,
      "n_pages": 69
    },
    {
      "key": "landmark_02",
      "n_occurrences": 207,
      "n_pages": 69
    },
    {
      "key": "svg_02",
      "n_occurrences": 202,
      "n_pages": 18
    },
    {
      "key": "img_01b",
      "n_occurrences": 152,
      "n_pages": 14
    },
    {
      "key": "aria_06",
      "n_occurrences": 104,
      "n_pages": 12
    },
    {
      "key": "table_02",
      "n_occurrences": 81,
      "n_pages": 69
    },
    {
      "key": "landmark_10",
      "n_occurrences": 69,
      "n_pages": 69
    }
  ]

  const tabsGoodBad = [
    {
      eventKey: "tab1",
      title: t("WEBSITES_PAGE.tabs.best_practices"),
      component:
        <GoodBadTab 
          main_content_website={websiteDark}
          tempData={successDetailsTable}
          top10Data={bestPracticesDistribution}
          color={"#15ac51"}
          goodOrBad={"top_3_best_practices"}
          title={t("WEBSITES_PAGE.top_10_best_practices_title")}
        />,
    },
    {
      eventKey: "tab2",
      title: t("WEBSITES_PAGE.tabs.bad_practices"),
      component:
        <GoodBadTab
          main_content_website={websiteDark}
          tempData={errorsDetailsTable}
          top10Data={errorsDistribution}
          color={"#e90018"}
          goodOrBad={"top_3_bad_practices"}
          title={t("WEBSITES_PAGE.top_10_bad_practices_title")}
        />,
    },
  ];

  return (
    <>
      <div className={`container website ${websiteDark}`}>
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

        <h1 className="bold my-2">{name}</h1>
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
                <section className={`bg-white px-5 py-2 mt-5 d-flex flex-row justify-content-between`}>
                  <div className="d-flex flex-column section_container py-4">
                    <h3 className="bold">{t("PAGES.accessibility_plot.title")}</h3>
                    <div className="d-flex radar_graphic justify-content-center">
                      {radarData && <RadarGraph tempData={radarData} />}
                    </div>
                  </div>
                </section>

                {/* Bar+Line Graph */}
                <section className={`bg-white px-5 py-2 mt-5 d-flex flex-row justify-content-between`}>
                  <div className="d-flex flex-column section_container py-4">
                    <h3 className="bold mb-3">{t("DIALOGS.scores.title")}</h3>
                    {barLineData && <BarLineGraphTabs tempData={barLineData} websiteStats={websiteStats} />}
                  </div>
                </section>

                {/* Good / Bad section */}
                <div className="good_bad mt-5">
                    {<Tabs tabs={tabsGoodBad} defaultActiveKey="tab1" vertical={false} />}
                </div>
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