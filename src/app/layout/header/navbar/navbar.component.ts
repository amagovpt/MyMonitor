import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  sub: Subscription;

  settings: boolean;
  website: string;
  page: string;
  code: boolean;
  ele: string;

  constructor(
    private router: Router,
    private location: Location
  ) {
    this.settings = false;
    this.website = null;
    this.page = null;
    this.code = false;
    this.ele = null;
  }

  ngOnInit(): void {
    this.sub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.settings = false;
        this.website = null;
        this.page = null;
        this.code = false;
        this.ele = null;

        const path = this.location.path();
        const segments = _.split(path, '/');

        switch (_.size(segments)) {
          case 5:
            if (segments[4] === 'code') {
              this.code = true;
            } else {
              this.ele = decodeURIComponent(segments[4]);
            }

          case 4:
            this.page = decodeURIComponent(segments[3]);

          case 3:
            if (segments[2] === 'settings') {
              this.settings = true;
            } else {
              this.website = decodeURIComponent(segments[2]);
            }
            break;
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
