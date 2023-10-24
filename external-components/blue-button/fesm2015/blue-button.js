import * as i0 from '@angular/core';
import { Injectable, Component, Input, NgModule } from '@angular/core';

class BlueButtonService {
    constructor() { }
}
BlueButtonService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: BlueButtonService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
BlueButtonService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: BlueButtonService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: BlueButtonService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return []; } });

class BlueButtonComponent {
    constructor() {
        this.reference = '#';
        this.insideText = '';
    }
    ngOnInit() {
    }
}
BlueButtonComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: BlueButtonComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
BlueButtonComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.17", type: BlueButtonComponent, selector: "lib-blue-button", inputs: { reference: "reference", insideText: "insideText" }, ngImport: i0, template: `
 <a class="btn rounded-pill ama-btn-secondary" href={{reference}} role="button">
              <span class="mr-1">{{insideText}}</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill"
                viewBox="0 0 16 16">
                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
              </svg>
            </a>
  `, isInline: true, styles: [".ama-btn-secondary {\n    color: #333399;\n    background-color: white;\n    border: solid 2px #333399;\n}\n.ama-btn-secondary:hover {\n    color: white;\n    background-color: #333399;\n    border: solid 2px #333399;\n}"] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: BlueButtonComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'lib-blue-button',
                    template: `
 <a class="btn rounded-pill ama-btn-secondary" href={{reference}} role="button">
              <span class="mr-1">{{insideText}}</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill"
                viewBox="0 0 16 16">
                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
              </svg>
            </a>
  `,
                    styles: [`.ama-btn-secondary {
    color: #333399;
    background-color: white;
    border: solid 2px #333399;
}
.ama-btn-secondary:hover {
    color: white;
    background-color: #333399;
    border: solid 2px #333399;
}`
                    ]
                }]
        }], ctorParameters: function () { return []; }, propDecorators: { reference: [{
                type: Input
            }], insideText: [{
                type: Input
            }] } });

class BlueButtonModule {
}
BlueButtonModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: BlueButtonModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
BlueButtonModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: BlueButtonModule, declarations: [BlueButtonComponent], exports: [BlueButtonComponent] });
BlueButtonModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: BlueButtonModule, imports: [[]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: BlueButtonModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        BlueButtonComponent
                    ],
                    imports: [],
                    exports: [
                        BlueButtonComponent
                    ]
                }]
        }] });

/*
 * Public API Surface of blue-button
 */

/**
 * Generated bundle index. Do not edit.
 */

export { BlueButtonComponent, BlueButtonModule, BlueButtonService };
//# sourceMappingURL=blue-button.js.map
