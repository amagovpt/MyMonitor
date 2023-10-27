import * as i0 from '@angular/core';
import { Injectable, Component, EventEmitter, Input, Output, NgModule } from '@angular/core';
import * as i1 from 'ngx-quill';
import { QuillModule } from 'ngx-quill';
import * as i2 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i3 from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

class AmaCommonService {
    constructor() { }
}
AmaCommonService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: AmaCommonService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
AmaCommonService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: AmaCommonService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: AmaCommonService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return []; } });

class AmaCommonComponent {
    constructor() { }
    ngOnInit() {
    }
}
AmaCommonComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: AmaCommonComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
AmaCommonComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.17", type: AmaCommonComponent, selector: "lib-ama-common", ngImport: i0, template: `
    <p>
      ama-common works!
    </p>
  `, isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: AmaCommonComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'lib-ama-common',
                    template: `
    <p>
      ama-common works!
    </p>
  `,
                    styles: []
                }]
        }], ctorParameters: function () { return []; } });

class AmaEditorComponent {
    constructor() {
        this.content = '';
        this.isPreview = false;
        this.changeEvent = new EventEmitter();
    }
    ngOnInit() {
    }
    ngAfterViewInit() {
    }
    textSave(event) {
        this.changeEvent.emit(event.html);
    }
}
AmaEditorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: AmaEditorComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
AmaEditorComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.17", type: AmaEditorComponent, selector: "ama-editor", inputs: { content: "content", editorId: "editorId", isPreview: "isPreview" }, outputs: { changeEvent: "changeEvent" }, ngImport: i0, template: "<quill-editor *ngIf=\"!isPreview\" placeholder=\"Deixe aqui suas notas...\" \r\n              theme=\"snow\" [styles]=\"{'height': '15rem','background-color': 'white'}\"\r\n    (onContentChanged)=\"textSave($event)\" [(ngModel)]=\"content\">\r\n    <div quill-editor-toolbar>\r\n        <span class=\"ql-formats\">\r\n            <button aria-label=\"Negrito\" class=\"ql-bold\" [title]=\"'Negrito'\"></button>\r\n            <button aria-label=\"Italico\" class=\"ql-italic\" [title]=\"'Italico'\"></button>\r\n            <button aria-label=\"Sublinhado\" class=\"ql-underline\" [title]=\"'Sublinhado'\"></button>\r\n            <button aria-label=\"Tra\u00E7ado\" class=\"ql-strike\" [title]=\"'Tra\u00E7ado'\"></button>\r\n        </span>\r\n        <span class=\"ql-formats\">\r\n            <button aria-label=\"Cita\u00E7\u00E3o\" class=\"ql-blockquote\" [title]=\"'Cita\u00E7\u00E3o'\"></button>\r\n            <button aria-label=\"Bloco de c\u00F3digo\" class=\"ql-code-block\" [title]=\"'Bloco de c\u00F3digo'\"></button>\r\n        </span>\r\n        <span class=\"ql-formats\">\r\n            <button aria-label=\"1\" type=\"button\" class=\"ql-header\" value=\"1\" [title]=\"'Cabe\u00E7alho Maior'\"></button>\r\n            <button aria-label=\"1\" type=\"button\" class=\"ql-header\" value=\"2\" [title]=\"'Cabe\u00E7alho Menor'\"></button>\r\n        </span>\r\n        <span class=\"ql-formats\">\r\n            <button aria-label=\"Lista Numerada\" type=\"button\" class=\"ql-list\" value=\"ordered\" [title]=\"'Lista Numerada'\"></button>\r\n            <button aria-label=\"Lista Bullet\" type=\"button\" class=\"ql-list\" value=\"bullet\" [title]=\"'Lista Bullet'\"></button>\r\n        </span>\r\n        <span class=\"ql-formats\">\r\n            <button aria-label=\"Diminuir identa\u00E7\u00E3o\" type=\"button\" class=\"ql-indent\" value=\"-1\" [title]=\"'Diminuir identa\u00E7\u00E3o'\"></button>\r\n            <button aria-label=\"Aumentar identa\u00E7\u00E3o\" type=\"button\" class=\"ql-indent\" value=\"+1\" [title]=\"'Aumentar identa\u00E7\u00E3o'\"></button>\r\n        </span>\r\n        <span class=\"ql-formats\">\r\n            <select class=\"ql-size\" aria-label=\"'Tamanho'\">\r\n                <option class=\"ql-picker-option\" [title]=\"'Grande'\" value=\"large\">Grande</option>\r\n                <option class=\"ql-picker-option\" [title]=\"'Normal'\" value=\"normal\" selected>Normal</option>\r\n                <option class=\"ql-picker-option\" [title]=\"'Pequeno'\" value=\"small\">Pequeno</option>\r\n            </select>\r\n        </span>\r\n        <span class=\"ql-formats\">\r\n            <button aria-label=\"Limpar Estilos\" class=\"ql-clean\" [title]=\"'Limpar Estilos'\"></button>\r\n            <button aria-label=\"Adicionar Link\" class=\"ql-link\" [title]=\"'Adicionar Link'\"></button>\r\n            <button aria-label=\"Adicionar Imagem\" class=\"ql-image\" [title]=\"'Adicionar Imagem'\"></button>\r\n        </span>\r\n    </div>\r\n</quill-editor>\r\n<quill-editor *ngIf=\"isPreview\" theme=\"snow\" \r\n              placeholder=\"\" \r\n              [styles]=\"{'height': '15rem','background-color': 'white'}\"\r\n              (onContentChanged)=\"textSave($event)\" \r\n              [(ngModel)]=\"content\"  [modules]   = \"{ toolbar: false }\"\r\n              [readOnly]=\"true\">\r\n</quill-editor>", styles: ["@import\"https://cdn.quilljs.com/1.3.6/quill.snow.css\";.editor{height:15rem}\n"], components: [{ type: i1.QuillEditorComponent, selector: "quill-editor" }], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i3.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i3.NgSelectOption, selector: "option", inputs: ["ngValue", "value"] }, { type: i3.ɵNgSelectMultipleOption, selector: "option", inputs: ["ngValue", "value"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: AmaEditorComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ama-editor',
                    templateUrl: './ama-editor.component.html',
                    styleUrls: ['./ama-editor.component.scss'],
                }]
        }], ctorParameters: function () { return []; }, propDecorators: { content: [{
                type: Input
            }], editorId: [{
                type: Input
            }], isPreview: [{
                type: Input
            }], changeEvent: [{
                type: Output
            }] } });

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

class AmaCommonModule {
}
AmaCommonModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: AmaCommonModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AmaCommonModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: AmaCommonModule, declarations: [AmaEditorComponent,
        BlueButtonComponent,
        GreenButtonComponent,
        PageNameTitleComponent], imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule, i1.QuillModule], exports: [AmaEditorComponent,
        BlueButtonComponent,
        GreenButtonComponent,
        PageNameTitleComponent] });
AmaCommonModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: AmaCommonModule, imports: [[
            CommonModule,
            FormsModule,
            ReactiveFormsModule,
            QuillModule.forRoot(),
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: AmaCommonModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        AmaEditorComponent,
                        BlueButtonComponent,
                        GreenButtonComponent,
                        PageNameTitleComponent
                    ],
                    imports: [
                        CommonModule,
                        FormsModule,
                        ReactiveFormsModule,
                        QuillModule.forRoot(),
                    ],
                    exports: [
                        AmaEditorComponent,
                        BlueButtonComponent,
                        GreenButtonComponent,
                        PageNameTitleComponent
                    ]
                }]
        }] });

/*
 * Public API Surface of ama-common
 */

/**
 * Generated bundle index. Do not edit.
 */

export { AmaCommonComponent, AmaCommonModule, AmaCommonService, AmaEditorComponent, BlueButtonComponent, GreenButtonComponent, PageNameTitleComponent };
//# sourceMappingURL=ama-common.js.map
