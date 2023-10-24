import * as i0 from '@angular/core';
import { Injectable, Component, Input, NgModule } from '@angular/core';

class GreenButtonService {
    constructor() { }
}
GreenButtonService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: GreenButtonService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
GreenButtonService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: GreenButtonService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: GreenButtonService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return []; } });

class GreenButtonComponent {
    constructor() {
        this.reference = '#';
        this.insideText = '';
    }
    ngOnInit() {
    }
}
GreenButtonComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: GreenButtonComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
GreenButtonComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.17", type: GreenButtonComponent, selector: "lib-green-button", inputs: { reference: "reference", insideText: "insideText" }, ngImport: i0, template: `
 <a class="btn rounded-pill ama-btn-sucess" [href]="reference" role="button">
   <span class="mr-1">{{insideText}}</span>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
     class="bi bi-plus-circle" viewBox="0 0 16 16">
     <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
      <path
       d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
      </svg>
   </a>
  `, isInline: true, styles: [".ama-btn-sucess {\n    color: white;\n    background-color: #3A8241;\n    border: solid 2px #3A8241;\n}\n\n.ama-btn-sucess:hover {\n    color: #3A8241;\n    background-color: white;\n    border: solid 2px #3A8241;\n}"] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: GreenButtonComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'lib-green-button',
                    template: `
 <a class="btn rounded-pill ama-btn-sucess" [href]="reference" role="button">
   <span class="mr-1">{{insideText}}</span>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
     class="bi bi-plus-circle" viewBox="0 0 16 16">
     <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
      <path
       d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
      </svg>
   </a>
  `,
                    styles: [`.ama-btn-sucess {
    color: white;
    background-color: #3A8241;
    border: solid 2px #3A8241;
}

.ama-btn-sucess:hover {
    color: #3A8241;
    background-color: white;
    border: solid 2px #3A8241;
}`
                    ]
                }]
        }], ctorParameters: function () { return []; }, propDecorators: { reference: [{
                type: Input
            }], insideText: [{
                type: Input
            }] } });

class GreenButtonModule {
}
GreenButtonModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: GreenButtonModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
GreenButtonModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: GreenButtonModule, declarations: [GreenButtonComponent], exports: [GreenButtonComponent] });
GreenButtonModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: GreenButtonModule, imports: [[]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: GreenButtonModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        GreenButtonComponent
                    ],
                    imports: [],
                    exports: [
                        GreenButtonComponent
                    ]
                }]
        }] });

/*
 * Public API Surface of green-button
 */

/**
 * Generated bundle index. Do not edit.
 */

export { GreenButtonComponent, GreenButtonModule, GreenButtonService };
//# sourceMappingURL=green-button.js.map
