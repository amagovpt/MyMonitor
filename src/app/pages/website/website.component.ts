import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { MessageService } from '../../services/message.service';
import { MonitorService } from '../../services/monitor.service';

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
    private message: MessageService
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
        });
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  addWebsitePages(data): void {
    this.loading = true;
    this.monitor.addWebsitePages(this.website, data.domain, data.urls)
      .subscribe(pages => {
        if (pages) {
          this.message.show('ADD_PAGES.success_message');
          this.pages = pages;
        }

        this.loading = false;
      });
  }
}
