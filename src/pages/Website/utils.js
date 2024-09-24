import { pathURL } from "../../App";
import clone from "lodash.clone";

export function getStatTitles (t) {
    // Texts for StatisticsHeader component
    let statsTitles = [
        {subtitle: t("STATISTICS.pages"), subtitle2: ""},
        {subtitle: t("STATISTICS.pages_without_errors"), subtitle2: ""},
        {subtitle: t("STATISTICS.pages_with_errors"), subtitle2: ""},
        {subtitle: t("STATISTICS.pages_without_errors_a_info"), subtitle2: t("STATISTICS.pages_without_errors_a")},
        {subtitle: t("STATISTICS.pages_without_errors_a_aa_info"), subtitle2: t("STATISTICS.pages_without_errors_a_aa")},
        {subtitle: t("STATISTICS.pages_without_errors_a_aa_aaa_info"), subtitle2: t("STATISTICS.pages_without_errors_a_aa_aaa")}
    ]

    return { statsTitles }
}

export function getRadarGraph (t, theme, labelsForRadar, data) {
    const options = {
      scales: {
        r: {
            min: 0,
            max: 10,
            grid: {
              color: theme === "light" ? "lightgrey" : 'lightgrey', // Color of the grid lines
            },
            angleLines: {
              color: theme === "light" ? "lightgrey" : 'lightgrey', // Color of the angle lines
            },
            ticks: {
              backdropColor: theme === "light" ? "transparent" : '#2c3241', // Background color for the tick labels
              color: theme === "light" ? "black" : 'white', // Color of the tick labels
            },
        },
      },
      plugins: {
        legend: {
          labels: {
            color: theme === "light" ? "black" : '#b6dcf6', // Color of the legend text
          }
        }
      }
    }

    const manchaData = {
      labels: labelsForRadar,
      datasets: [
        {
          label: t("PAGES.accessibility_plot.label"),
          data: data,
          backgroundColor: theme === "light" ? 'rgba(255, 99, 132, 0.2)' : 'rgba(182, 220, 246, 0.2)',
          borderColor: theme === "light" ? 'rgba(255, 99, 132, 1)' : '#b6dcf6' ,
          borderWidth: 1,
        },
      ],
    };

    return { options, manchaData }
}

export function getBarLineGraph (t, dataForLine, dataForBar, websiteStats, theme) {
  const headersBarLine = ['[1 - 2[', '[2 - 3[', '[3 - 4[', '[4 - 5[', '[5 - 6[', '[6 - 7[', '[7 - 8[', '[8 - 9[', '[9 - 10[']

  const dataBarLine = {
      labels: headersBarLine,
      datasets: [
        {
          type: 'line',
          label: t("DIALOGS.scores.cumulative"),
          data: dataForLine,
          backgroundColor: 'rgba(51, 51, 153, 1)',
          borderColor: 'rgba(51, 51, 153, 1)',
          borderWidth: 2,
          fill: false,
          tension: 0,
          pointBackgroundColor: 'red', // Set the color of the dots
          pointBorderColor: 'red',     // Set the border color of the dots
        },
        {
          type: 'bar',
          label: t("DIALOGS.scores.frequency"),
          data: dataForBar,
          backgroundColor: [
            '#e90018',
            '#e90018',
            '#f38e10',
            '#f38e10',
            '#f3d609',
            '#f3d609',
            '#f3d609',
            '#15ac51',
            '#15ac51' 
          ],
          borderWidth: 0,
        }
      ]
  };

  const optionsBarLine = {
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            color: theme === "light" ? 'rgba(0,0,0, 1)' : 'white', // Color of the legend text
          }
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              let label = context.dataset.label || '';
              if (label) {
                label += ': ';
              }
              if (context.dataset.type === 'bar') {
                // Format the tooltip for bar dataset
                const nPages = (context.raw*websiteStats.statsTable[0]/100).toFixed(0)
                return [
                  `${label}${context.raw}%`,      // Main value
                  `${t("DIALOGS.scores.frequency")}: ${nPages}` // Additional value
                ];
              } else if (context.dataset.type === 'line') {
                // Format the tooltip for line dataset
                const nPages = (context.raw*websiteStats.statsTable[0]/100).toFixed(0)
                return [
                  `${label}${context.raw}%`,      // Main value
                  `${t("DIALOGS.scores.percentage")}: ${nPages}` // Additional value
                ];
              }
              return label;
            }
          }
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: t("DIALOGS.scores.range"),
            color: theme === "light" ? 'rgba(0,0,0, 1)' : 'white', // Color of Title on X axis
            font: {
              size: 14
            }
          },
          ticks: {
            font: {
              size: 14
            },
            color: theme === "light" ? 'rgba(0,0,0, 1)' : 'white' // Color of Text on X axis
          },
          grid: {
            color: theme === "light" ? 'rgba(0,0,0, 0.1)' : 'rgba(255, 255, 255, 0.2)' // Color of Dividers vertically
          }
        },
        y: {
          min: 0,
          max: 100,
          title: {
            display: true,
            text: t("DIALOGS.scores.percentage_label"),
            color: theme === "light" ? 'rgba(0,0,0, 1)' : 'white', // Color of Title on Y axis
            font: {
              size: 14
            }
          },
          ticks: {
            font: {
              size: 14,
            },
            color: theme === "light" ? 'rgba(0,0,0, 1)' : 'white' // Color of Text on Y axis
          },
          grid: {
            color: theme === "light" ? 'rgba(0,0,0, 0.1)' : 'rgba(255, 255, 255, 0.2)' // Color of Dividers horizontaly
          }
        }
      }
  };

  return { headersBarLine, dataBarLine, optionsBarLine }
}

export function getBarLineTable (t) {
  const dataHeaders = [
      [
        {type: "Text", name: t("DIALOGS.scores.range")},
        {type: "Text", name: t("DIALOGS.scores.frequency"), justifyCenter: true},
        {type: "Text", name: t("DIALOGS.scores.frequency")+ " (%)", justifyCenter: true},
        {type: "Text", name: t("DIALOGS.scores.cumulative"), justifyCenter: true},
        {type: "Text", name: t("DIALOGS.scores.cumulative")+ " (%)", justifyCenter: true},
      ]
  ]

  const columnsOptions = {
      range: { type: "Text", center: false, bold: false, decimalPlace: false },
      frequency: { type: "Number", center: true, bold: false, decimalPlace: false },
      frequency_percent: { type: "Text", center: true, bold: false, decimalPlace: false },
      cumulative: { type: "Number", center: true, bold: false, decimalPlace: false },
      cumulative_percent: { type: "Text", center: true, bold: false, decimalPlace: false },
  }

  return { dataHeaders,  columnsOptions }
}


export function getGoodBadTabTables (t) {
  const dataTableHeadersA = [
    {type: "Text", name: "Nº", justifyCenter: true},
    {type: "Text", name: t("DIALOGS.table.description"), justifyCenter: false},
    {type: "Text", name: t("WEBSITES_PAGE.table_best_practices.n_errors_label"), justifyCenter: true},
  ]
  
  const dataTableHeadersAA = [
    {type: "Text", name: "Nº", justifyCenter: true},
    {type: "Text", name: t("DIALOGS.table.description"), justifyCenter: false},
    {type: "Text", name: t("WEBSITES_PAGE.table_best_practices.n_errors_label"), justifyCenter: true},
  ]
  
  const dataTableHeadersAAA = [
    {type: "Text", name: "Nº", justifyCenter: true},
    {type: "Text", name: t("DIALOGS.table.description"), justifyCenter: false},
    {type: "Text", name: t("WEBSITES_PAGE.table_best_practices.n_errors_label"), justifyCenter: true},
  ]

  let columnsOptionsAAs = {
      number: { type: "Text", center: true, bold: true, decimalPlace: false },
      name: { type: "DangerousHTML", center: false, bold: false, decimalPlace: false },
      nPages: { type: "DoubleText", center: true, bold: false, decimalPlace: false },
  }

  const detailsTableHeaders = [
      {type: "Text", bigWidth: "50%", name: t("WEBSITES_PAGE.table_best_practices.practice_label")},
      {type: "Text", bigWidth: "30%", name: t("WEBSITES_PAGE.table_best_practices.details_practice_label"), justifyCenter: true},
      {type: "Text", name: t("WEBSITES_PAGE.table_best_practices.n_pages_label"), justifyCenter: true},
      {type: "Text", name: t("WEBSITES_PAGE.table_best_practices.n_errors_label"), justifyCenter: true},
      {type: "Text", name: t("WEBSITES_PAGE.table_best_practices.lvl_label"), justifyCenter: true},
  ]
  
  let columnsOptionsDetails = {
      name: { type: "DangerousHTML", center: false, bold: false, decimalPlace: false },
      practices: { type: "MultiText", center: true, bold: false, decimalPlace: false },
      pages: { type: "Number", center: true, bold: false, decimalPlace: false },
      occurences: { type: "Number", center: true, bold: false, decimalPlace: false },
      lvl: { type: "Text", center: true, bold: false, decimalPlace: false, ariaLabel: true },
  }

  let ariaLabels = {
    A: t("WEBSITES_PAGE.ariaLabels.A"),
    AA: t("WEBSITES_PAGE.ariaLabels.AA"),
    AAA: t("WEBSITES_PAGE.ariaLabels.AAA")
  }

  return { dataTableHeadersA, dataTableHeadersAA, dataTableHeadersAAA, columnsOptionsAAs, detailsTableHeaders, columnsOptionsDetails, ariaLabels }
}


export function getTopTenGraphTable (t, theme, labelsForHorizontal, dataForHorizontal, color) {
  const dataHeaders = [
      {type: "Text", name: t("DIALOGS.errors.level"), justifyCenter: true},
      {type: "Text", bigWidth: "50%", name: t("DIALOGS.errors.description")},
      {type: "Text", name: t("DIALOGS.errors.pages"), justifyCenter: true},
      {type: "Text", name: t("DIALOGS.errors.situations"), justifyCenter: true}
  ]
  
  let columnsOptions = {
      lvl: { type: "Text", center: true, bold: false, decimalPlace: false, ariaLabel: true },
      name: { type: "DangerousHTML", center: false, bold: false, decimalPlace: false },
      nPages: { type: "Number", center: true, bold: false, decimalPlace: false },
      nOccurrences: { type: "Number", center: true, bold: false, decimalPlace: false },
  }
  
  const optionsHorizontalBar = {
      indexAxis: 'y', // This makes the bar chart horizontal
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            color: theme === "light" ? 'rgba(0,0,0, 1)' : 'white', // Color of the legend text
          }
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: t("DIALOGS.corrections.situations_label"),
            color: theme === "light" ? 'rgba(0,0,0, 1)' : 'white', // Color of Title on X axis
            font: {
              size: 14
            }
          },
          ticks: {
              color: theme === "light" ? 'rgba(0,0,0, 1)' : 'white' // Color of Text on X axis
          },
          grid: {
              color: theme === "light" ? 'rgba(0,0,0, 0.1)' : 'rgba(255, 255, 255, 0.2)' // Color of Dividers vertically
          }
        },
        y: {
          title: {
            display: true,
            text: t("DIALOGS.corrections.tests_label"),
            color: theme === "light" ? 'rgba(0,0,0, 1)' : 'white', // Color of Title on Y axis
            font: {
              size: 14
            }
          },
          ticks: {
              color: theme === "light" ? 'rgba(0,0,0, 1)' : 'white', // Color of Text on Y axis
              callback: function (value, index) {
                  // Fetch the label using the index
                  const label = labelsForHorizontal[index];
                  // Word-wrap the label into multiple lines
                  const words = label.split(' ');
                  const maxLength = 20; // Set the max length for each line
                  let result = '';
                  let line = '';
                  words.forEach((word) => {
                      if (line.length + word.length < maxLength) {
                      line += word + ' ';
                      } else {
                      result += line.trim() + '\n';
                      line = word + ' ';
                      }
                  });
                  result += line.trim();
                  return result;
              }
            },
          grid: {
              color: theme === "light" ? 'rgba(0,0,0, 0.1)' : 'rgba(255, 255, 255, 0.2)' // Color of Dividers horizontaly
          }
        }
      }
  };
  
  const horizontalData = {
      labels: labelsForHorizontal,
      datasets: [
        {
          type: 'bar',
          label: t("DIALOGS.corrections.situations_label"),
          data: dataForHorizontal,
          backgroundColor: color,
          borderWidth: 0,
        }
      ]
  };

  return { dataHeaders, columnsOptions, optionsHorizontalBar, horizontalData }
}

export function getPagesSortingTable (t, name) {
  const pagesHeaders = [
    [
      {type: "Checkbox", name: t("PAGES.table.filter"), property: ""},
      {type: "SortingText", bigWidth: "30%", name: t("PAGES.table.page"), property: "Uri"},
      {type: "SortingText", name: t("PAGES.table.score"), property: "Score", justifyCenter: true},
      {type: "Text", name: t("PAGES.table.levels"), property: "", justifyCenter: true, multiCol: true, nCol: 3},
      {type: "SortingText", bigWidth: "20%", name: t("PAGES.table.date"), property: "Evaluation_Date", justifyCenter: true},
    ],
    [
      {type: "Empty", name: t("MISC.empty"), nCol: 3, multiCol: true, empty: true},
      {type: "SortingText", name: t("PAGES.table.A"), property: "A", justifyCenter: true},
      {type: "SortingText", name: t("PAGES.table.AA"), property: "AA", justifyCenter: true},
      {type: "SortingText", name: t("PAGES.table.AAA"), property: "AAA", justifyCenter: true},
      {type: "Empty", name: t("MISC.empty")+2, nCol: 1, multiCol: true, empty: true}
    ]
  ]
  
  // Alterar isto para dar match com os nomes corretos
  let columnsOptions = {
    id: { type: "Checkbox", center: true, bold: false, decimalPlace: false, headers: t("PAGES.table.filter").replaceAll(' ', ''), label: t("PAGES.table.filterCell")},
    Uri: { type: "Link", center: true, bold: false, decimalPlace: false, headers: t("PAGES.table.page"), href: (row) => {
      return `${pathURL}user/${name}/${encodeURIComponent(row['Uri'])}`
    }},
    Show_In: { type: "Skip", center: false, bold: false, decimalPlace: false, headers: '' },
    Creation_Date: { type: "Skip", center: false, bold: false, decimalPlace: false, headers: '' },
    Score: { type: "Number", center: true, bold: false, decimalPlace: false, headers: t("PAGES.table.score") },
    A: { type: "Number", center: true, bold: false, decimalPlace: false, headers: (t("PAGES.table.levels").replaceAll(' ', '') + " " + t("PAGES.table.A")) },
    AA: { type: "Number", center: true, bold: false, decimalPlace: false, headers: (t("PAGES.table.levels").replaceAll(' ', '') + " " + t("PAGES.table.AA")) },
    AAA: { type: "Number", center: true, bold: false, decimalPlace: false, headers: (t("PAGES.table.levels").replaceAll(' ', '') + " " + t("PAGES.table.AAA")) },
    Tot: { type: "Skip", center: false, bold: false, decimalPlace: false, headers: '' },
    Errors: { type: "Skip", center: false, bold: false, decimalPlace: false, headers: '' },
    Evaluation_Date: { type: "Text", center: true, bold: false, decimalPlace: false, headers: t("PAGES.table.date") },
  }

  let paginationButtonsTexts = [
    t("PAGES.table.paginator.first_page"),
    t("PAGES.table.paginator.previous_page"),
    t("PAGES.table.paginator.next_page"),
    t("PAGES.table.paginator.last_page")
  ]

  let nItemsPerPageText=[
    t("PAGES.table.paginator.see"),
    t("PAGES.table.paginator.per_page")
  ]

  let itemsPaginationText = [
    t("PAGES.table.paginator.of"),
    t("PAGES.table.paginator.items")
  ]

  return { pagesHeaders, columnsOptions, paginationButtonsTexts, nItemsPerPageText, itemsPaginationText }
}

export function pagesListTable(pages, moment) {
  let pagesTable = []
  pages.map((page) => {
    const pageObject = {
      ...page,
      Evaluation_Date: moment(page.Evaluation_Date).format("LL"),
    }
    pagesTable.push(pageObject)
  })

  return pagesTable;
}

export function removeCertainPages(parsedData, name, newPages) {
  localStorage.removeItem('websiteListForWebsitePage')
  const obj = parsedData.find(item => item.name === name);

  if (obj) {
    obj.pages = newPages.map(page => {
      let newPage
      if (page.hasOwnProperty('PageId')) {
        newPage = { id: page.PageId, ...page }
        delete newPage.PageId;
      }
      return newPage;
    });
    localStorage.setItem('websiteListForWebsitePage', JSON.stringify(parsedData))
  }

  return parsedData;
}

export function urlValidator(t, urls, domain) {
  let invalid = "";
  const size = urls.length;

  if(!size){
    return "";
  }

  const cleanedUrls = []
  for(let i=0; i<size; i++){
    const url = urls[i].trim();
    if(!url.includes(".") || url[url.length-1] === "."){
      invalid = t("ADD_PAGES.error");
      break;
    } else if(!url.startsWith("http://") && !url.startsWith("https://")){
      invalid = t("ADD_PAGES.url_missing_protocol");
      break;
    } else if(!url.startsWith(domain)) {
      invalid = t("ADD_PAGES.url_match_error");
      break;
    }
    cleanedUrls.push(url)
  }

  return {invalid, cleanedUrls}
}

export function getResultsTable(t) {
  const resultsHeader = [
    {type: "Checkbox", name: t("PAGES.table.filter"), property: ""},
    {type: "Text", bigWidth: "97%", name: t("ADD_PAGES.crawler.dialog.table.caption"), property: "", justifyCenter: false},
  ]
  
  // Alterar isto para dar match com os nomes corretos
  let columnsOptions = {
    id: { type: "Checkbox", center: true, bold: false, decimalPlace: false, label: t("PAGES.table.filterCell") },
    CrawlWebsiteId: { type: "Skip", center: false, bold: false, decimalPlace: false },
    Uri: { type: "Link", center: false, bold: false, decimalPlace: false, href: (row) => {
      return ""
    }},
  }

  return { resultsHeader, columnsOptions }
}