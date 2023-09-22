import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from "@angular/core";

import { MatDialog } from "@angular/material/dialog";
import { CrawlerResultsDialogComponent } from 'src/app/dialogs/crawler-results-dialog/crawler-results-dialog.component';
import { MonitorService } from 'src/app/services/monitor.service';




@Component({
  encapsulation: ViewEncapsulation.ShadowDom,
  selector: 'app-crawl-website',
  templateUrl: './crawl-website.component.html',
  styleUrls: ['./crawl-website.component.scss']
})
export class CrawlWebsiteComponent implements OnInit {

  @Input("website") website: string;
  @Output("addPages") addWebsitePages = new EventEmitter<any>();

  crawlStatus: string;
  crawlButtonDisable: boolean;
  crawlResultsDisabled: boolean;
  startingUrl: string;
  loading: boolean;


  constructor(
    private monitor: MonitorService,
    private dialog: MatDialog,
    private cd: ChangeDetectorRef
  ) {

    this.crawlStatus = "not_running";
    this.crawlButtonDisable = false;
    this.crawlResultsDisabled = true;
    this.loading = true;

  }

  ngOnInit(): void {
    this.monitor
      .getWebsiteStartingUrl(this.website)
      .subscribe((startingUrl) => {
        if (startingUrl) {
          this.startingUrl = startingUrl;

          this.monitor.checkCrawler(this.startingUrl).subscribe((result) => {
            console.log(this.startingUrl);
            console.log(result);
            if (result !== null) {
              if (result) {
                this.crawlStatus = "complete";
                this.crawlButtonDisable = true;
                this.crawlResultsDisabled = false;
              } else {
                this.crawlStatus = "inProgress";
                this.crawlButtonDisable = true;
                this.crawlResultsDisabled = true;
              }
            }
            this.loading = false;
            this.cd.detectChanges();
          });
        }

      });
  }

  crawlWebsite(): void {
    this.monitor.crawlWebsite(this.startingUrl).subscribe((result) => {
      if (result) {
        this.crawlStatus = "inProgress";
        this.crawlButtonDisable = true;
      } else {
        alert("Error");
      }

      this.cd.detectChanges();
    });
  }

  openCrawlingResultsDialog(): void {
    const dialog = this.dialog.open(CrawlerResultsDialogComponent, {
      width: "130vw",
      maxHeight: "90vh",
      data: {
        startingUrl: this.startingUrl,
      },
    });

    dialog.afterClosed().subscribe((data) => {
      console.log(data);
      if (data) {
        this.addWebsitePages.next({
          startingUrl: this.startingUrl,
          urls: data,
        });
      }
    });
  }

  deleteCrawlingResults(): void {
    this.monitor.deleteCrawlingResults(this.startingUrl).subscribe((result) => {
      if (result) {
        this.crawlStatus = "not_running";
        this.crawlButtonDisable = false;
        this.crawlResultsDisabled = true;
      } else {
        alert("Error");
      }

      this.cd.detectChanges();
    });
  }
}

