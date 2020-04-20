import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { MessageService } from '../../services/message.service';
import { MonitorService } from '../../services/monitor.service';

import { RemovePagesConfirmationDialogComponent } from '../../dialogs/remove-pages-confirmation-dialog/remove-pages-confirmation-dialog.component';
import { BackgroundEvaluationsInformationDialogComponent } from '../../dialogs/background-evaluations-information-dialog/background-evaluations-information-dialog.component';

@Component({
  selector: 'app-website',
  templateUrl: './website.component.html',
  styleUrls: ['./website.component.css']
})
export class WebsiteComponent implements OnInit, OnDestroy {

  loading: boolean;
  error: boolean;

  sub: Subscription;

  website: string;

  pages: Array<any>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private monitor: MonitorService,
    private message: MessageService,
    private dialog: MatDialog,
    private cd: ChangeDetectorRef
  ) {
    this.loading = true;
    this.error = false;
    this.website = '';
  }

  ngOnInit(): void {
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.website = params.website;

      this.monitor.getUserWebsitePages(this.website)
        .subscribe(pages => {
          if (pages !== null) {
            this.pages = pages;
          } else {
            this.error = true;
          }

          this.loading = false;
          this.cd.detectChanges();
        });
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  addWebsitePages(data): void {
    /*this.loading = true;
    this.monitor.addWebsitePages(this.website, data.domain, data.urls)
      .subscribe(pages => {
        if (pages) {
          this.message.show('ADD_PAGES.success_message');
          this.pages = pages;
        }

        this.loading = false;
        this.cd.detectChanges();
      });*/
    this.monitor.addWebsitePages(this.website, data.domain, data.urls)
      .subscribe(result => {
        if (result) {
          this.dialog.open(BackgroundEvaluationsInformationDialogComponent, { width: '40vw' })
        } else {
          alert('Error');
        }
      });
  }

  removePages(pagesId): void {
    const dialogRef = this.dialog.open(RemovePagesConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'true') {
        this.loading = true;
        this.cd.detectChanges();

        this.monitor.removePages(this.website, pagesId)
          .subscribe(pages => {
            if (pages === null) {
              this.error = true;
            } else {
              this.message.show('PAGES.remove_success_message');
              this.pages = pages;
            }

            this.loading = false;
            this.cd.detectChanges();
          });
      }
    });
  }
}
