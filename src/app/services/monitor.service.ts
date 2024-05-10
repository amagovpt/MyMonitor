import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { map, retry, catchError } from "rxjs/operators";
import { MatDialog } from "@angular/material/dialog";

import { ConfigService } from "./config.service";
import { MessageService } from "./message.service";

import { Response } from "../models/response";
import { MmError } from "../models/error";

import { AddPagesErrorsDialogComponent } from "../dialogs/add-pages-errors-dialog/add-pages-errors-dialog.component";

@Injectable({
  providedIn: "root",
})
export class MonitorService {
  constructor(
    private readonly message: MessageService,
    private readonly http: HttpClient,
    private readonly router: Router,
    private readonly dialog: MatDialog,
    private readonly config: ConfigService
  ) {}

  getUserWebsites(): Observable<Array<any>> {
    return this.http
      .get<any>(this.config.getServer("/website/myMonitor"), {
        observe: "response",
      })
      .pipe(
        retry(3),
        map((res) => {
          const response = <Response>res.body;

          if (!res.body || res.status === 404) {
            throw new MmError(404, "Service not found", "SERIOUS");
          }

          if (response.success !== 1) {
            throw new MmError(response.success, response.message);
          }

          return <Array<any>>response.result;
        }),
        catchError((err) => {
          console.log(err);
          return of(null);
        })
      );
  }

  getUserWebsitePages(website: string): Observable<Array<any>> {
    return this.http
      .get<any>(this.config.getServer("/page/myMonitor/website/" + website), {
        observe: "response",
      })
      .pipe(
        retry(3),
        map((res) => {
          const response = <Response>res.body;

          if (!res.body || res.status === 404) {
            throw new MmError(404, "Service not found", "SERIOUS");
          }

          if (response.success !== 1) {
            throw new MmError(response.success, response.message);
          }

          return <Array<any>>response.result;
        }),
        catchError((err) => {
          if (err.code === -1) {
            this.router.navigateByUrl("/user");
          }
          console.log(err);
          return of(null);
        })
      );
  }

  getWebsiteStartingUrl(website: string): Observable<string> {
    return this.http
      .get<any>(this.config.getServer("/website/myMonitor/url/" + website), {
        observe: "response",
      })
      .pipe(
        retry(3),
        map((res) => {
          const response = <Response>res.body;

          if (!res.body || res.status === 404) {
            throw new MmError(404, "Service not found", "SERIOUS");
          }

          if (response.success !== 1) {
            throw new MmError(response.success, response.message);
          }

          return <string>response.result;
        }),
        catchError((err) => {
          console.log(err);
          if (err.code === -17) {
            this.message.show("MISC.unexpected_error");
          }
          return of(null);
        })
      );
  }

  addWebsitePages(
    website: string,
    startingUrl: string,
    pages: Array<string>
  ): Observable<Array<any>> {
    return this.http
      .post<any>(
        this.config.getServer("/page/myMonitor/create"),
        { website, startingUrl, pages },
        { observe: "response" }
      )
      .pipe(
        retry(3),
        map((res) => {
          const response = <Response>res.body;

          if (!res.body || res.status === 404) {
            throw new MmError(404, "Service not found", null, null, "SERIOUS");
          }

          if (response.success !== 1) {
            throw new MmError(
              response.success,
              response.message,
              "NORMAL",
              response.errors,
              response.result
            );
          }

          return <Array<any>>response.result;
        }),
        catchError((err) => {
          if (err.code === 0) {
            this.dialog.open(AddPagesErrorsDialogComponent, {
              data: err.errors,
            });
            return of(err.result);
          } else {
            console.log(err);
            this.message.show("MISC.unexpected_error");
            return of(null);
          }
        })
      );
  }

  checkCrawler(website: string): Observable<boolean> {
    return this.http
      .post<any>(
        this.config.getServer("/crawler/crawlUserCheck"),
        { website },
        { observe: "response" }
      )
      .pipe(
        map((res) => {
          const response = <Response>res.body;
          if (!res.body || res.status === 404) {
            throw new MmError(404, "Service not found", "SERIOUS");
          }

          if (response.success !== 1) {
            throw new MmError(response.success, response.message);
          }

          return <boolean>response.result;
        }),
        catchError((err) => {
          return of(null);
        })
      );
  }

  crawlWebsite(website: string): Observable<boolean> {
    return this.http
      .post<any>(
        this.config.getServer("/crawler/crawlUser"),
        { website },
        { observe: "response" }
      )
      .pipe(
        map((res) => {
          const response = <Response>res.body;

          if (!res.body || res.status === 404) {
            throw new MmError(404, "Service not found", "SERIOUS");
          }

          if (response.success !== 1) {
            throw new MmError(response.success, response.message);
          }

          return <boolean>response.result;
        }),
        catchError((err) => {
          console.log(err);
          return of(null);
        })
      );
  }

  getCrawlerResults(website: string): Observable<any> {
    return this.http
      .post<any>(
        this.config.getServer("/crawler/crawlUserResults"),
        { website },
        { observe: "response" }
      )
      .pipe(
        map((res) => {
          const response = <Response>res.body;
          if (!res.body || res.status === 404) {
            throw new MmError(404, "Service not found", "SERIOUS");
          }

          if (response.success !== 1) {
            throw new MmError(response.success, response.message);
          }

          return <any>response.result;
        }),
        catchError((err) => {
          console.log(err);
          return of(null);
        })
      );
  }

  deleteCrawlingResults(website: string): Observable<boolean> {
    return this.http
      .post<any>(
        this.config.getServer("/crawler/crawlUserDelete"),
        { website },
        { observe: "response" }
      )
      .pipe(
        map((res) => {
          const response = <Response>res.body;

          if (!res.body || res.status === 404) {
            throw new MmError(404, "Service not found", "SERIOUS");
          }

          if (response.success !== 1) {
            throw new MmError(response.success, response.message);
          }

          return <boolean>response.result;
        }),
        catchError((err) => {
          console.log(err);
          return of(null);
        })
      );
  }

  checkIfWebsiteIsInObservatory(website: string): Observable<boolean> {
    return this.http
      .post<any>(
        this.config.getServer("/website/isInObservatory"),
        { website },
        { observe: "response" }
      )
      .pipe(
        map((res) => {
          const response = <Response>res.body;

          if (!res.body || res.status === 404) {
            throw new MmError(404, "Service not found", "SERIOUS");
          }

          if (response.success !== 1) {
            throw new MmError(response.success, response.message);
          }

          return <boolean>response.result;
        }),
        catchError((err) => {
          console.log(err);
          return of(null);
        })
      );
  }

  transferObservatoryPages(website: string): Observable<boolean> {
    return this.http
      .post<any>(
        this.config.getServer("/website/transferObservatoryPages"),
        { website },
        { observe: "response" }
      )
      .pipe(
        map((res) => {
          const response = <Response>res.body;

          if (!res.body || res.status === 404) {
            throw new MmError(404, "Service not found", "SERIOUS");
          }

          if (response.success !== 1) {
            throw new MmError(response.success, response.message);
          }

          return <boolean>response.result;
        }),
        catchError((err) => {
          console.log(err);
          return of(null);
        })
      );
  }

  removePages(website: string, pagesId: Array<number>): Observable<Array<any>> {
    return this.http
      .post<any>(
        this.config.getServer("/page/myMonitor/remove"),
        { website,pagesId },
        { observe: "response" }
      )
      .pipe(
        retry(3),
        map((res) => {
          const response = <Response>res.body;

          if (!res.body || res.status === 404) {
            throw new MmError(404, "Service not found", "SERIOUS");
          }

          if (response.success !== 1) {
            throw new MmError(response.success, response.message);
          }

          return <Array<any>>response.result;
        }),
        catchError((err) => {
          console.log(err);
          return of(null);
        })
      );
  }

  reEvaluatePages(website: string): Observable<boolean> {
    return this.http
      .post<any>(
        this.config.getServer("/website/myMonitor/reEvaluate"),
        { website },
        { observe: "response" }
      )
      .pipe(
        retry(3),
        map((res) => {
          const response = <Response>res.body;

          if (!res.body || res.status === 404) {
            throw new MmError(404, "Service not found", "SERIOUS");
          }

          if (response.success !== 1) {
            throw new MmError(response.success, response.message);
          }

          return <boolean>response.result;
        }),
        catchError((err) => {
          console.log(err);
          return of(null);
        })
      );
  }

  changePassword(
    password: string,
    newPassword: string,
    confirmPassword: string
  ): Observable<boolean> {
    return this.http
      .post<any>(
        this.config.getServer("/user/changePassword"),
        { password, newPassword, confirmPassword },
        { observe: "response" }
      )
      .pipe(
        retry(3),
        map((res) => {
          const response = <Response>res.body;

          if (!res.body || res.status !== 201) {
            throw new Error("Invalid password");
          }

          if (response.success !== 1) {
            throw new MmError(response.success, response.message);
          }

          return <boolean>response.result;
        }),
        catchError((err) => {
          this.message.show(
            "SETTINGS.change_password.old_password_match_error"
          );
          console.log(err);
          return of(null);
        })
      );
  }
}
