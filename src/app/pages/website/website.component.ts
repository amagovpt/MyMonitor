import { Component, OnInit, OnDestroy, ChangeDetectorRef } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { MatDialog } from "@angular/material/dialog";

import { MessageService } from "../../services/message.service";
import { MonitorService } from "../../services/monitor.service";
import { EvaluationService } from "../../services/evaluation.service";

import { RemovePagesConfirmationDialogComponent } from "../../dialogs/remove-pages-confirmation-dialog/remove-pages-confirmation-dialog.component";
import { BackgroundEvaluationsInformationDialogComponent } from "../../dialogs/background-evaluations-information-dialog/background-evaluations-information-dialog.component";

import { Website } from "../../models/website";
import { WebsiteListService } from "src/app/services/website-list.service";

@Component({
  selector: "app-website",
  templateUrl: "./website.component.html",
  styleUrls: ["./website.component.scss"],
})
export class WebsiteComponent implements OnInit {
  loading: boolean;
  error: boolean;

  sub: Subscription;

  website: string;

  websiteObject: Website;

  pages: Array<any>;
  scoreDistributionData: any;


  constructor(
    private monitor: MonitorService,
    private websiteList: WebsiteListService,
    private message: MessageService,
    private evaluation: EvaluationService,
    private dialog: MatDialog,
    private cd: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
  ) {
    this.loading = true;
    this.error = false;
    this.website = "";
  }

  async ngOnInit(): Promise<void> {
    await this.websiteList.getAllWebsites();
    this.sub = this.activatedRoute.params.subscribe((params) => {
      this.website = params.website;
      this.websiteObject = this.websiteList.getWebsiteByName(this.website);
      this.pages = this.websiteObject.pages;
      this.scoreDistributionData = {
        number: this.pages.length,
        frequency: this.websiteObject.frequencies,
      };

      this.loading = false;
      this.cd.detectChanges();
    })

  }

  getWebsiteName() {
    const name = window.location.pathname.replace("/user/", "");
    return decodeURIComponent(name);
  }

  addWebsitePages(data): void {
    this.monitor
      .addWebsitePages(this.website, data.startingUrl, data.urls)
      .subscribe((result) => {
        if (result) {
          this.dialog.open(BackgroundEvaluationsInformationDialogComponent, {
            width: "40vw",
          });
        } else {
          alert("Error");
        }
      });
  }

  removePages(pagesId): void {
    const dialogRef = this.dialog.open(RemovePagesConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result === "true") {
        this.loading = true;
        this.cd.detectChanges();

        this.monitor.removePages(this.website, pagesId).subscribe((pages) => {
          if (pages === null) {
            this.error = true;
          } else {
            this.message.show("PAGES.remove_success_message");
          }

          //this.loading = false;
         // this.cd.detectChanges();
          window.location.reload();
        });
      }
    });
  }

  reEvaluatePages(uriList: []): void {
    uriList.map((uri,i) => {
      this.evaluation.evaluateUrl(uri).subscribe((result) => {
        if (result && i===0) {
          this.dialog.open(BackgroundEvaluationsInformationDialogComponent, {
            width: "40vw",
          });
        } if(!result) {
          alert("Error");
        }
      });
    })

  }

  downloadCSV(): void {
    this.evaluation.downloadWebsiteCSV(this.website).subscribe();
  }

  downloadEARL(): void {
    this.evaluation.downloadWebsiteEARL(this.website).subscribe();
  }
}
