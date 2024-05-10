import { OnInit, Component, Injectable, ViewChild, ElementRef, ChangeDetectionStrategy, AfterViewInit, DoCheck, AfterContentInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { UserService } from './services/user.service';

@Injectable()
@Component({
  encapsulation: ViewEncapsulation.ShadowDom,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {

  @ViewChild('sidenav', { static: true }) sidenav: ElementRef;

  selectedLang: string;

  langs: any = {
    'pt': 'Portuguese',
    'en': 'English'
  };

  langCodes: any = {
    'English': 'en',
    'Portuguese': 'pt'
  };

  sub: Subscription;

  website: string;
  page: string;
  code: boolean;
  ele: string;

  showGoToTop: boolean;

  @ViewChild('skipToMainLink') skipToMainLink: ElementRef;

  constructor(
    public el: ElementRef,
    public user: UserService,
    public router: Router,
    private location: Location,
    public translate: TranslateService
  ) {
    this.translate.addLangs(Object.values(this.langs));
    this.translate.setDefaultLang('Portuguese');

    const lang = localStorage.getItem('language');

    if (!lang) {
      const browserLang = translate.getBrowserLang();
      const use = Object.keys(this.langs).includes(browserLang) ? this.langs[browserLang] : 'Portuguese';

      this.translate.use(use);
      localStorage.setItem('language', use);
    } else {
      this.translate.use(lang);
    }

    this.selectedLang = this.translate.currentLang;

    this.showGoToTop = false;
  }
  
  goToMain(event :Event){
    event.preventDefault();
    if(!this.router.url.includes("#main")) {
      window.location.href = this.router.url + "#main";
    } else {
      window.location.href = this.router.url.split('#')[0] + "#main";
    }
  }

  ngOnInit(): void {
    // this.skipToMainLink.nativeElement.focus();                     

    this.translate.onLangChange.subscribe(() => {
      this.updateLanguage();
    });

    this.sub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
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
            this.page = decodeURIComponent(segments[3]);

          case 3:
            if (segments[2] !== 'settings') {
              this.website = decodeURIComponent(segments[2]);
            }
            break;
        }

        // document.getElementById('main').scrollIntoView();    
      }
    });
  }

  /**
   * Update the language in the lang attribute of the html element.
   */
  updateLanguage(): void {
    const lang = document.createAttribute('lang');
    lang.value = this.langCodes[this.translate.currentLang];
    this.el.nativeElement.parentElement.parentElement.attributes.setNamedItem(lang);
  }

  changeLanguage(): void {
    this.translate.use(this.selectedLang);
    localStorage.setItem('language', this.selectedLang);
    this.updateLanguage();
  }

  goToTop(): void {
    document.getElementById('main').scrollIntoView();
  }

  onScroll(e): void {
    if (e.srcElement.scrollTop > 300) {
      this.showGoToTop = true;
    } else {
      this.showGoToTop = false;
    }
  }
}
