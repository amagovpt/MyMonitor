import * as i0 from '@angular/core';
import { Injectable, Component, Input, NgModule } from '@angular/core';

class PageNameTitleService {
    constructor() { }
}
PageNameTitleService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: PageNameTitleService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
PageNameTitleService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: PageNameTitleService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: PageNameTitleService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return []; } });

class PageNameTitleComponent {
    constructor() {
        this.pageName = '';
        this.pageTitle = '';
    }
    ngOnInit() {
    }
}
PageNameTitleComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: PageNameTitleComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
PageNameTitleComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.17", type: PageNameTitleComponent, selector: "lib-page-name-title", inputs: { pageName: "pageName", pageTitle: "pageTitle" }, ngImport: i0, template: `
  <div>
      <a href="">
        <p class="m-0 h2 text-ama">{{pageName}}
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
            class="bi bi-arrow-up-right" viewBox="0 0 16 16">
            <path fill-rule="evenodd"
              d="M14 2.5a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0 0 1h4.793L2.146 13.146a.5.5 0 0 0 .708.708L13 3.707V8.5a.5.5 0 0 0 1 0v-6z" />
          </svg>
        </p>
      </a>
      <h1>{{pageTitle}}</h1>
    </div>
  `, isInline: true, styles: [".text-ama {\n    color: #333399;\n} "] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: PageNameTitleComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'lib-page-name-title',
                    template: `
  <div>
      <a href="">
        <p class="m-0 h2 text-ama">{{pageName}}
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
            class="bi bi-arrow-up-right" viewBox="0 0 16 16">
            <path fill-rule="evenodd"
              d="M14 2.5a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0 0 1h4.793L2.146 13.146a.5.5 0 0 0 .708.708L13 3.707V8.5a.5.5 0 0 0 1 0v-6z" />
          </svg>
        </p>
      </a>
      <h1>{{pageTitle}}</h1>
    </div>
  `,
                    styles: [`.text-ama {
    color: #333399;
} `
                    ]
                }]
        }], ctorParameters: function () { return []; }, propDecorators: { pageName: [{
                type: Input
            }], pageTitle: [{
                type: Input
            }] } });

class PageNameTitleModule {
}
PageNameTitleModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: PageNameTitleModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
PageNameTitleModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: PageNameTitleModule, declarations: [PageNameTitleComponent], exports: [PageNameTitleComponent] });
PageNameTitleModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: PageNameTitleModule, imports: [[]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: PageNameTitleModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        PageNameTitleComponent
                    ],
                    imports: [],
                    exports: [
                        PageNameTitleComponent
                    ]
                }]
        }] });

/*
 * Public API Surface of page-name-title
 */

/**
 * Generated bundle index. Do not edit.
 */

export { PageNameTitleComponent, PageNameTitleModule, PageNameTitleService };
//# sourceMappingURL=page-name-title.js.map
