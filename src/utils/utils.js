import tests from './tests'
import clone from "lodash.clonedeep";
import orderBy from "lodash.orderby";
import { saveAs } from "file-saver";

import { pathURL } from "../App";
import { api } from '../config/api'

function getTopTenErrors(errors) {
    const errorsList = [];
    for (const key in errors || {}) {
      if (errors[key]) {
        errorsList.push({
          key,
          n_elems: errors[key].n_elems,
          n_pages: errors[key].n_pages,
          test: tests[key].test
        });
      }
    }

    return errorsList.sort((a, b) => a.n_elems - b.n_elems).slice(0, 10);
}

function getTopTenBestPractices(success) {
    const practices = [];
    for (const key in success || {}) {
      practices.push({
        key,
        n_occurrences: success[key].n_occurrences,
        n_pages: success[key].n_pages,
        test: tests[key].test
      });
    }

    return orderBy(
      practices,
      ["n_occurrences", "n_pages"],
      ["desc", "desc"]
    ).slice(0, 10);
}

function getWebsiteSuccessDetailsTable(success, pages) {
    const practices = [];
    for (const key in success || {}) {
      if (success[key]) {
        practices.push({
          key,
          test: tests[key].test,
          n_occurrences: success[key].n_occurrences,
          n_pages: success[key].n_pages,
          lvl: tests[key].level.toUpperCase(),
          quartiles: calculateQuartiles(getPassedOccurrencesByPage(key, pages)),
        });
      }
    }

    const practicesData = orderBy(
      practices,
      ["n_pages", "n_occurrences"],
      ["desc", "desc"]
    );
    const practicesKeys = Object.keys(practicesData);

    return { practicesKeys, practicesData };
}

function getWebsiteErrorsDetailsTable(errors, pages) {
    const practices = [];
    for (const key in errors || {}) {
      if (errors[key]) {
        practices.push({
          key,
          test: tests[key].test,
          n_occurrences: errors[key].n_occurrences,
          n_pages: errors[key].n_pages,
          lvl: tests[key].level.toUpperCase(),
          quartiles: calculateQuartiles(getErrorOccurrencesByPage(key, pages)),
        });
      }
    }

    const practicesData = orderBy(
      practices,
      ["n_pages", "n_occurrences"],
      ["desc", "desc"]
    );
    const practicesKeys = Object.keys(practicesData);

    return { practicesKeys, practicesData };
}

function getPassedOccurrencesByPage(test, pages) {
    const occurrences = [];
    for (const page of pages || []) {
      const tot = JSON.parse(atob(page.Tot))
      const practice = tot.elems[tests[test]["test"]];
      if (
        tot.results[test] &&
        tests[test]["result"] === "passed"
      ) {
        if (!practice) {
          occurrences.push(1);
        } else {
          occurrences.push(practice);
        }
      }
    }
    return occurrences;
}

function getErrorOccurrencesByPage(test, pages) {
    const occurrences = [];

    for (const p of pages) {
      const tot = JSON.parse(atob(p.Tot))
      const error = tot["elems"][tests[test]["test"]];
      if (error && tests[test]["result"] === "failed") {
        if (error === "langNo" || error === "titleNo") {
          occurrences.push(1);
        } else {
          occurrences.push(error);
        }
      }
    }
    return occurrences;
}

function calculateQuartiles(data) {
    const values = data
      .filter((e) => e !== undefined)
      .sort((a, b) => a - b);

    let q1;
    let q2;
    let q3;
    let q4;

    q1 = values[Math.round(0.25 * (values.length + 1)) - 1];

    if (values.length % 2 === 0) {
      q2 = (values[values.length / 2 - 1] + values[values.length / 2]) / 2;
    } else {
      q2 = values[(values.length + 1) / 2];
    }

    q3 = values[Math.round(0.75 * (values.length + 1)) - 1];
    q4 = values[values.length - 1];

    const tmp = {
      q1: [],
      q2: [],
      q3: [],
      q4: [],
    };

    let q;
    for (const v of values || []) {
      if (v <= q1) {
        q = "q1";
      } else {
        if (v <= q2) {
          q = "q2";
        } else {
          if (v <= q3) {
            q = "q3";
          } else {
            q = "q4";
          }
        }
      }

      tmp[q].push(v);
    }

    const final = [];

    for (const k in tmp) {
      if (k) {
        const v = tmp[k];
        const sum = v.length;
        if (sum > 0) {
          const test = {
            tot: sum,
            por: Math.round((sum * 100) / values.length),
            int: {
              lower: v[0],
              upper: v[sum - 1],
            },
          };

          final.push(clone(test));
        }
      }
    }

    return final;
}

export function getData (website, pages, websiteList, websiteListForWebsitePage, moment) {
    let websiteScore = 0;
    let conformidadeA = 0;    //Não pode ter erros do tipo A
    let conformidadeAA = 0;   //Não pode ter erros do tipo A, AA
    let conformidadeAAA = 0;  //Não pode ter erros do tipo A, AA, AAA
    let pageWithErrors = 0;
    let accessibilityPlot = [];
    let scoreDistributionFrequency = [0,0,0,0,0,0,0,0,0]
    let errors = {}
    let success = {}
    let recentPage
    let oldestPage
    let pagesTable = []
    
    pages.map((page) => {
      const totAfterTransformation = JSON.parse(atob(page.Tot))
      const errorAfterTransformation = JSON.parse(atob(page.Errors))
      const pageScore = parseFloat(page.Score)
      // Website Score
      websiteScore += pageScore

      // Conformed Pages
      if(page.A > 0){
        pageWithErrors++;
      } else if(page.AA > 0) {
        conformidadeA++;
      } else if(page.AAA > 0) {
        conformidadeAA++;
      } else {
        conformidadeAAA++;
      }

      // Accesssibility Plot - Radar Data
      accessibilityPlot.push(pageScore)

      // BarLine Data - Frequência de score por páginas
      const floor = Math.floor(pageScore);
      scoreDistributionFrequency[floor >= 2 ? (floor === 10 ? floor - 2 : floor - 1) : 0]++;

      // Errors
      const pageErrors = errorAfterTransformation
      for(const key in  totAfterTransformation.results || {}){
        const test = tests[key]["test"];
        const elem = tests[key]["elem"];
        const occurrences =
        pageErrors[test] === undefined || pageErrors[test] < 1
          ? 1
          : pageErrors[test];
        const result = tests[key]["result"];
        if (result === "failed") {
          if (Object.keys(errors).includes(key)) {
            errors[key]["n_occurrences"] += occurrences;
            errors[key]["n_pages"]++;
          } else {
            errors[key] = {
              n_pages: 1,
              n_occurrences: occurrences,
              elem,
              test,
              result,
            };
          }
        } else if (result === "passed") {
          if (Object.keys(success).includes(key)) {
            success[key]["n_occurrences"] += occurrences;
            success[key]["n_pages"]++;
          } else {
            success[key] = {
              n_pages: 1,
              n_occurrences: occurrences,
              elem,
              test,
              result,
            };
          }
        }
      }

      //Evaluation dates
      if (!recentPage) {
        recentPage = new Date(page.Evaluation_Date);
      }
  
      if (!oldestPage) {
        oldestPage = new Date(page.Evaluation_Date);
      }
  
      if (new Date(page.Evaluation_Date) > recentPage) {
        recentPage = new Date(page.Evaluation_Date);
      } else if (new Date(page.Evaluation_Date) < oldestPage) {
        oldestPage = new Date(page.Evaluation_Date);
      }


      const pageObject = {
        id: page.PageId,
        Uri: page.Uri,
        Show_In: page.Show_In,
        Creation_Date: page.Creation_Date,
        Score: pageScore,
        A: page.A,
        AA: page.AA,
        AAA: page.AAA,
        Tot: page.Tot,
        Errors: page.Errors,
        Evaluation_Date: page.Evaluation_Date,
      }
      delete pageObject.PageId;
      pagesTable.push(pageObject)
    })

  
    const websiteForList = {
      id: website.WebsiteId,
      rank: 0,
      name: website.Name,
      declaration: website.Declaration,
      stamp: website.Stamp,
      score: websiteScore/pages.length,
      nPages: pages.length,
      A: conformidadeA,
      AA: conformidadeAA,
      AAA: conformidadeAAA
    }
    websiteList.push(websiteForList)


    const websiteForWebsitePage = {
      id: website.WebsiteId,
      name: website.Name,
      startingUrl: website.StartingUrl,
      oldestPage: oldestPage,
      recentPage: recentPage,
      score: websiteScore/pages.length,
      nPages: pages.length,
      pagesWithErrors: pageWithErrors,
      pagesWithoutErrorsA: conformidadeA,
      pagesWithoutErrorsAA: conformidadeAA,
      pagesWithoutErrorsAAA: conformidadeAAA,
      pagesWithoutErrors: conformidadeA + conformidadeAA + conformidadeAAA,
      accessibilityPlotData: accessibilityPlot,
      scoreDistributionFrequency: scoreDistributionFrequency,
      errorsDistribution: getTopTenErrors(errors),
      bestPracticesDistribution: getTopTenBestPractices(success),
      errors: errors,
      success: success,
      successDetailsTable: getWebsiteSuccessDetailsTable(success, pages),
      errorsDetailsTable: getWebsiteErrorsDetailsTable(errors, pages),
      pages: pagesTable
    }
    websiteListForWebsitePage.push(websiteForWebsitePage)
}

export function createStatisticsObject(data, moment) {
  return {
    score: data.score ? (data.score).toFixed(1) : 0,
    recentPage: moment(data.recentPage).format("LL"),
    oldestPage: moment(data.oldestPage).format("LL"),
    statsTable: [
      data.nPages,
      data.pagesWithoutErrors,
      data.pagesWithErrors,
      data.pagesWithoutErrorsA,
      data.pagesWithoutErrorsAA,
      data.pagesWithoutErrorsAAA
    ]
  }
}


export async function logoutUser(setLoading, setError, navigate, t) {
  setLoading(true)
  if (api.isUserLoggedIn()) {
    const {response, err} = await api.logout()
    if(err && err.code && err.code === "ERR_NETWORK") {
      setError(t("MISC.unexpected_error") + " " + t("MISC.error_contact"));
      removeLocalStorages(navigate)
    } else if(response && response.data.success === 1) {
      removeLocalStorages(navigate)
    }
  } else {
    removeLocalStorages(navigate)
  }
  setLoading(false)
}

export function removeLocalStorages(navigate) {
  console.log('remove localstorages')
  localStorage.removeItem('MM-username');
  localStorage.removeItem('MM-SSID');
  localStorage.removeItem('expires-at');
  localStorage.removeItem('websiteList')
  localStorage.removeItem('websiteListForWebsitePage')
  localStorage.removeItem('evaluation')
  localStorage.removeItem('evaluationUrl')
  localStorage.removeItem("elemData");
  navigate(`${pathURL}`)
}

export function downloadCSV(dataProcess, originalData, t) {
  const data = [];

  let error, level, sc, desc, num;
  const descs = [
    "CSV.date",
    "CSV.errorType",
    "CSV.level",
    "CSV.criteria",
    "CSV.desc",
    "CSV.count",
    "CSV.value",
    "RESULTS.summary.score",
  ];

  for (const row in dataProcess["results"]) {
    if (dataProcess["results"][row]) {
      const rowData = [];
      error =
        "CSV." +
        (dataProcess["results"][row]["prio"] === 3
          ? "scoreok"
          : dataProcess["results"][row]["prio"] === 2
            ? "scorewar"
            : "scorerror");
      level = dataProcess["results"][row]["lvl"];
      num = dataProcess["results"][row]["value"];
      desc =
        "TESTS_RESULTS." +
        dataProcess["results"][row]["msg"] +
        (num === 1 ? ".s" : ".p");
      sc = tests[dataProcess["results"][row]["msg"]]["scs"];
      sc = sc.replace(/,/g, " ");

      descs.push(desc, error);
      rowData.push(
        dataProcess?.metadata?.url,
        originalData.date,
        dataProcess["results"][row]["msg"],
        error,
        level,
        sc,
        desc,
        num === undefined ? 0 : isNaN(parseInt(num)) ? 1 : num,
        !isNaN(parseInt(num)) ? "" : num,
        dataProcess?.metadata?.score.replace(".", ",")
      );
      data.push(rowData);
    }
  }

  const labels = [];
  for(const row in data){
    if(data[row]){
      data[row][6] = t(`${data[row][6]}`).replace("{{value}}", data[row][8] ? data[row][8] : data[row][7])
      data[row][6] = data[row][6].replace(new RegExp("<mark>", "g"), "");
      data[row][6] = data[row][6].replace(new RegExp("</mark>", "g"), "");
      data[row][6] = data[row][6].replace(new RegExp("<code>", "g"), "");
      data[row][6] = data[row][6].replace(new RegExp("</code>", "g"), "");
      data[row][6] = data[row][6].replace(new RegExp("&lt;", "g"), "");
      data[row][6] = data[row][6].replace(new RegExp("&gt;", "g"), "");
      data[row][3] = t(`${data[row][3]}`);
    }
  }
  labels.push("URI");
  labels.push(t("CSV.date"));
  labels.push("ID");
  labels.push(t("CSV.errorType"));
  labels.push(t("CSV.level"));
  labels.push(t("CSV.criteria"));
  labels.push(t("CSV.desc"));
  labels.push(t("CSV.count"));
  labels.push(t("CSV.value"));
  labels.push(t("RESULTS.summary.score"));

  let csvContent = labels.join(";") + "\r\n";
  for (const row of data || []) {
    csvContent += row.join(";") + "\r\n";
  }

  const blob = new Blob([csvContent], { type: "text/csv" });
  saveAs(blob, "eval.csv");
}

export function checkUserHasPage(website, websitesList, pageName) {
  const targetObject = websitesList.find(obj => obj.name === website);
  if(targetObject) {
    const pageObject = targetObject.pages.find(obj => obj.Uri === pageName);
    if(pageObject) {
      return true
    }
  }
  return false
}