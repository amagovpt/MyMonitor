export function getStatTitles (t) {
    const websiteStats = {
        score: (8.486663447825674).toFixed(1),
        recentPage: "16 de outubro de 2023",
        oldestPage: "16 de outubro de 2023",
        statsTable: [
          50,
          24,
          26,
          20,
          5,
          1
        ]
    }

    // Texts for StatisticsHeader component
    let statsTitles = [
        {subtitle: t("STATISTICS.pages"), subtitle2: ""},
        {subtitle: t("STATISTICS.pages_without_errors"), subtitle2: ""},
        {subtitle: t("STATISTICS.pages_with_errors"), subtitle2: ""},
        {subtitle: t("STATISTICS.pages_without_errors_a_info"), subtitle2: t("STATISTICS.pages_without_errors_a")},
        {subtitle: t("STATISTICS.pages_without_errors_a_aa_info"), subtitle2: t("STATISTICS.pages_without_errors_a_aa")},
        {subtitle: t("STATISTICS.pages_without_errors_a_aa_aaa_info"), subtitle2: t("STATISTICS.pages_without_errors_a_aa_aaa")}
    ]

    return { websiteStats, statsTitles }
}

// Function to get data for Radar
// t -> the translation
// theme -> Dark/Light theme
// labelsForRadar -> labels for the radar
// data -> Data for the radar
// RETURNS
// options -> Options for the radar
// manchaData -> Data for radar
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

// Function to get data for Bar/Line Graph
// t -> the translation 
// dataForLine -> data array for the line graph
// dataForBar -> data array for the bar graph
// websiteStats -> stats for StatisticHeader used to calculate the number of pages
// theme -> dark / light theme
// RETURNS
// headersBarLine -> Bar graph X labels
// dataBarLine -> Bar & Line Data
// optionsBarLine -> Options to change the Bar & Line graph
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

// Function to get data for Bar/Line Table
// t -> the translation 
// RETURNS
// dataHeaders -> Bar/Line Table headers
// columnsOptions -> Bar/Line type of render to execute p/ attribute
export function getBarLineTable (t) {
  const dataHeaders = [
      [
        {icon: false, name: t("DIALOGS.scores.range")},
        {icon: false, name: t("DIALOGS.scores.frequency"), justifyCenter: true},
        {icon: false, name: t("DIALOGS.scores.frequency")+ " (%)", justifyCenter: true},
        {icon: false, name: t("DIALOGS.scores.cumulative"), justifyCenter: true},
        {icon: false, name: t("DIALOGS.scores.cumulative")+ " (%)", justifyCenter: true},
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
