import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  encapsulation: ViewEncapsulation.ShadowDom,
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
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
        const segments = path.split('/');

        switch (segments.length) {
          case 5:
            if (segments[4] === 'code') {
              this.code = true;
            } else {
              this.ele = decodeURIComponent(segments[4]);
            }
          case 4:
            this.page = decodeURIComponent(decodeURIComponent(segments[3]));

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
