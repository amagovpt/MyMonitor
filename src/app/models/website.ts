import { Page } from "./page";
import tests from "../tests";
import clone from "lodash.clonedeep";
import orderBy from "lodash.orderby";



export class Website {
  id: number;
  pages: Array<Page>;
  score: number;
  totalPoints:number;
  A: number;
  AA: number;
  AAA: number;
  pagesWithErrors: number;
  frequencies: Array<number>;
  errors: any;
  recentPage: Date;
  oldestPage: Date;
  success: any;
  tot: any;
  startingUrl: string;
  name: string;
  declaration: number | null;
  declarationDate: Date | null;
  stamp: number | null;
  stampDate: Date | null;


  constructor(startingUrl: string, name: string, declaration: number | null,
    declarationDate: Date | null,
    stamp: number | null,
    stampDate: Date | null,
    id: number,
  ) {
    this.id = id;
    this.pages = new Array<Page>();
    this.totalPoints = 0;
    this.A = 0;
    this.AA = 0;
    this.AAA = 0;
    this.frequencies = new Array<number>(9).fill(0);
    this.errors = {};
    this.success = {};
    this.tot = {};
    this.pagesWithErrors = 0;
    this.name = name;
    this.startingUrl = startingUrl;
    this.declaration = declaration;
    this.declarationDate = declarationDate ? new Date(declarationDate) : null;
    this.stamp = stamp;
    this.stampDate = stampDate ? new Date(stampDate) : null;
  }

  addPage(
    score: number,
    errors: any,
    tot: any,
    A: number,
    AA: number,
    AAA: number,
    evaluationDate: Date,
    uri:string,
    id:number
  ): void {
    const page = new Page(uri,id);
    page.addEvaluation(score, errors, tot, A, AA, AAA, evaluationDate);
    this.pages.push(page);

    this.totalPoints += score;
    this.score = this.totalPoints/this.pages.length;
    
    if (A > 0)
      this.pagesWithErrors++;
    else if (AA > 0)
      this.A++;
    else if (AAA > 0)
      this.AA++;
    else
      this.AAA++;
    const floor = Math.floor(score);
    this.frequencies[floor >= 2 ? (floor === 10 ? floor - 2 : floor - 1) : 0]++;

    const pageErrors = page.evaluation.errors;

    for (const key in page.evaluation.tot.results || {}) {
      const test = tests[key]["test"];
      const elem = tests[key]["elem"];
      const occurrences =
        pageErrors[test] === undefined || pageErrors[test] < 1
          ? 1
          : pageErrors[test];
      const result = tests[key]["result"];

      if (result === "failed") {
        if (Object.keys(this.errors).includes(key)) {
          this.errors[key]["n_occurrences"] += occurrences;
          this.errors[key]["n_pages"]++;
        } else {
          this.errors[key] = {
            n_pages: 1,
            n_occurrences: occurrences,
            elem,
            test,
            result,
          };
        }
      } else if (result === "passed") {
        if (Object.keys(this.success).includes(key)) {
          this.success[key]["n_occurrences"] += occurrences;
          this.success[key]["n_pages"]++;
        } else {
          this.success[key] = {
            n_pages: 1,
            n_occurrences: occurrences,
            elem,
            test,
            result,
          };
        }
      }
    }

    if (!this.recentPage) {
      this.recentPage = evaluationDate;
    }

    if (!this.oldestPage) {
      this.oldestPage = evaluationDate;
    }

    if (evaluationDate > this.recentPage) {
      this.recentPage = evaluationDate;
    } else if (evaluationDate < this.oldestPage) {
      this.oldestPage = evaluationDate;
    }
  }
  

  getAllScores(): Array<number> {
    return this.pages.map((page: Page) => page.evaluation.score);
  }

  getTopTenErrors(): any {
    const errors = new Array<any>();
    for (const key in this.errors || {}) {
      if (this.errors[key]) {
        errors.push({
          key,
          n_elems: this.errors[key].n_elems,
          n_pages: this.errors[key].n_pages,
          test: tests[key].test
        });
      }
    }

    return errors.sort((a: any, b: any) => a.n_elems - b.n_elems).slice(0, 10);
  }

  getTopTenBestPractices(): any {
    const practices = new Array<any>();
    for (const key in this.success || {}) {
      practices.push({
        key,
        n_occurrences: this.success[key].n_occurrences,
        n_pages: this.success[key].n_pages,
        test: tests[key].test
      });
    }

    return orderBy(
      practices,
      ["n_occurrences", "n_pages"],
      ["desc", "desc"]
    ).slice(0, 10);
  }

  getErrorOccurrencesByPage(test: string): Array<number> {
    const occurrences = new Array<number>();

    for (const p of this.pages) {
      const error = p.evaluation.tot["elems"][tests[test]["test"]];
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

  getPassedOccurrencesByPage(test: string): Array<number> {
    const occurrences = new Array<number>();
    for (const page of this.pages || []) {
      const practice = page.evaluation.tot.elems[tests[test]["test"]];
      if (
        page.evaluation.tot.results[test] &&
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

  getPassedWarningOccurrencesByPage(test: string): Array<number> {
    const occurrences = new Array<number>();

    for (const p of this.pages) {
      const error = p.evaluation.tot["elems"][tests[test]["test"]];
      if (
        error &&
        (tests[test]["result"] === "passed" ||
          tests[test]["result"] === "warning")
      ) {
        occurrences.push(error);
      }
    }
    return occurrences;
  }

  getWebsiteSuccessDetailsTable(): any {
    const practices = new Array<any>();
    for (const key in this.success || {}) {
      if (this.success[key]) {
        practices.push({
          key,
          test: tests[key].test,
          n_occurrences: this.success[key].n_occurrences,
          n_pages: this.success[key].n_pages,
          lvl: tests[key].level.toUpperCase(),
          quartiles: this.calculateQuartiles(
            this.getPassedOccurrencesByPage(key)
          ),
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

  getWebsiteErrorsDetailsTable(): any {
    const practices = new Array<any>();
    for (const key in this.errors || {}) {
      if (this.errors[key]) {
        practices.push({
          key,
          test: tests[key].test,
          n_occurrences: this.errors[key].n_occurrences,
          n_pages: this.errors[key].n_pages,
          lvl: tests[key].level.toUpperCase(),
          quartiles: this.calculateQuartiles(
            this.getErrorOccurrencesByPage(key)
          ),
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

  calculateQuartiles(data: any): Array<any> {
    const values = data
      .filter((e: any) => e !== undefined)
      .sort((a: number, b: number) => a - b);

    let q1: number;
    let q2: number;
    let q3: number;
    let q4: number;

    q1 = values[Math.round(0.25 * (values.length + 1)) - 1];

    if (values.length % 2 === 0) {
      q2 = (values[values.length / 2 - 1] + values[values.length / 2]) / 2;
    } else {
      q2 = values[(values.length + 1) / 2];
    }

    q3 = values[Math.round(0.75 * (values.length + 1)) - 1];
    q4 = values[values.length - 1];

    const tmp = {
      q1: new Array<number>(),
      q2: new Array<number>(),
      q3: new Array<number>(),
      q4: new Array<number>(),
    };

    let q: string;
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

    const final = new Array<any>();

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
}
