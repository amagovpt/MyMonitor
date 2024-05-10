(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('ngx-quill'), require('@angular/common'), require('@angular/forms')) :
    typeof define === 'function' && define.amd ? define('ama-common', ['exports', '@angular/core', 'ngx-quill', '@angular/common', '@angular/forms'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global["ama-common"] = {}, global.ng.core, global.i1, global.ng.common, global.ng.forms));
})(this, (function (exports, i0, i1, i2, i3) { 'use strict';

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () { return e[k]; }
                    });
                }
            });
        }
        n["default"] = e;
        return Object.freeze(n);
    }

    var i0__namespace = /*#__PURE__*/_interopNamespace(i0);
    var i1__namespace = /*#__PURE__*/_interopNamespace(i1);
    var i2__namespace = /*#__PURE__*/_interopNamespace(i2);
    var i3__namespace = /*#__PURE__*/_interopNamespace(i3);

    var AmaCommonService = /** @class */ (function () {
        function AmaCommonService() {
        }
        return AmaCommonService;
    }());
    AmaCommonService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: AmaCommonService, deps: [], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    AmaCommonService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: AmaCommonService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: AmaCommonService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return []; } });

    var AmaCommonComponent = /** @class */ (function () {
        function AmaCommonComponent() {
        }
        AmaCommonComponent.prototype.ngOnInit = function () {
        };
        return AmaCommonComponent;
    }());
    AmaCommonComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: AmaCommonComponent, deps: [], target: i0__namespace.ɵɵFactoryTarget.Component });
    AmaCommonComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.17", type: AmaCommonComponent, selector: "lib-ama-common", ngImport: i0__namespace, template: "\n    <p>\n      ama-common works!\n    </p>\n  ", isInline: true });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: AmaCommonComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'lib-ama-common',
                        template: "\n    <p>\n      ama-common works!\n    </p>\n  ",
                        styles: []
                    }]
            }], ctorParameters: function () { return []; } });

    var AmaEditorComponent = /** @class */ (function () {
        function AmaEditorComponent() {
            this.content = '';
            this.isPreview = false;
            this.changeEvent = new i0.EventEmitter();
        }
        AmaEditorComponent.prototype.ngOnInit = function () {
        };
        AmaEditorComponent.prototype.ngAfterViewInit = function () {
        };
        AmaEditorComponent.prototype.textSave = function (event) {
            this.changeEvent.emit(event.html);
        };
        return AmaEditorComponent;
    }());
    AmaEditorComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: AmaEditorComponent, deps: [], target: i0__namespace.ɵɵFactoryTarget.Component });
    AmaEditorComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.17", type: AmaEditorComponent, selector: "ama-editor", inputs: { content: "content", editorId: "editorId", isPreview: "isPreview" }, outputs: { changeEvent: "changeEvent" }, ngImport: i0__namespace, template: "<quill-editor *ngIf=\"!isPreview\" placeholder=\"Deixe aqui suas notas...\" \r\n              theme=\"snow\" [styles]=\"{'height': '15rem','background-color': 'white'}\"\r\n    (onContentChanged)=\"textSave($event)\" [(ngModel)]=\"content\">\r\n    <div quill-editor-toolbar>\r\n        <span class=\"ql-formats\">\r\n            <button aria-label=\"Negrito\" class=\"ql-bold\" [title]=\"'Negrito'\"></button>\r\n            <button aria-label=\"Italico\" class=\"ql-italic\" [title]=\"'Italico'\"></button>\r\n            <button aria-label=\"Sublinhado\" class=\"ql-underline\" [title]=\"'Sublinhado'\"></button>\r\n            <button aria-label=\"Tra\u00E7ado\" class=\"ql-strike\" [title]=\"'Tra\u00E7ado'\"></button>\r\n        </span>\r\n        <span class=\"ql-formats\">\r\n            <button aria-label=\"Cita\u00E7\u00E3o\" class=\"ql-blockquote\" [title]=\"'Cita\u00E7\u00E3o'\"></button>\r\n            <button aria-label=\"Bloco de c\u00F3digo\" class=\"ql-code-block\" [title]=\"'Bloco de c\u00F3digo'\"></button>\r\n        </span>\r\n        <span class=\"ql-formats\">\r\n            <button aria-label=\"1\" type=\"button\" class=\"ql-header\" value=\"1\" [title]=\"'Cabe\u00E7alho Maior'\"></button>\r\n            <button aria-label=\"1\" type=\"button\" class=\"ql-header\" value=\"2\" [title]=\"'Cabe\u00E7alho Menor'\"></button>\r\n        </span>\r\n        <span class=\"ql-formats\">\r\n            <button aria-label=\"Lista Numerada\" type=\"button\" class=\"ql-list\" value=\"ordered\" [title]=\"'Lista Numerada'\"></button>\r\n            <button aria-label=\"Lista Bullet\" type=\"button\" class=\"ql-list\" value=\"bullet\" [title]=\"'Lista Bullet'\"></button>\r\n        </span>\r\n        <span class=\"ql-formats\">\r\n            <button aria-label=\"Diminuir identa\u00E7\u00E3o\" type=\"button\" class=\"ql-indent\" value=\"-1\" [title]=\"'Diminuir identa\u00E7\u00E3o'\"></button>\r\n            <button aria-label=\"Aumentar identa\u00E7\u00E3o\" type=\"button\" class=\"ql-indent\" value=\"+1\" [title]=\"'Aumentar identa\u00E7\u00E3o'\"></button>\r\n        </span>\r\n        <span class=\"ql-formats\">\r\n            <select class=\"ql-size\" aria-label=\"'Tamanho'\">\r\n                <option class=\"ql-picker-option\" [title]=\"'Grande'\" value=\"large\">Grande</option>\r\n                <option class=\"ql-picker-option\" [title]=\"'Normal'\" value=\"normal\" selected>Normal</option>\r\n                <option class=\"ql-picker-option\" [title]=\"'Pequeno'\" value=\"small\">Pequeno</option>\r\n            </select>\r\n        </span>\r\n        <span class=\"ql-formats\">\r\n            <button aria-label=\"Limpar Estilos\" class=\"ql-clean\" [title]=\"'Limpar Estilos'\"></button>\r\n            <button aria-label=\"Adicionar Link\" class=\"ql-link\" [title]=\"'Adicionar Link'\"></button>\r\n            <button aria-label=\"Adicionar Imagem\" class=\"ql-image\" [title]=\"'Adicionar Imagem'\"></button>\r\n        </span>\r\n    </div>\r\n</quill-editor>\r\n<quill-editor *ngIf=\"isPreview\" theme=\"snow\" \r\n              placeholder=\"\" \r\n              [styles]=\"{'height': '15rem','background-color': 'white'}\"\r\n              (onContentChanged)=\"textSave($event)\" \r\n              [(ngModel)]=\"content\"  [modules]   = \"{ toolbar: false }\"\r\n              [readOnly]=\"true\">\r\n</quill-editor>", styles: ["@import\"https://cdn.quilljs.com/1.3.6/quill.snow.css\";.editor{height:15rem}\n"], components: [{ type: i1__namespace.QuillEditorComponent, selector: "quill-editor" }], directives: [{ type: i2__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3__namespace.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i3__namespace.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i3__namespace.NgSelectOption, selector: "option", inputs: ["ngValue", "value"] }, { type: i3__namespace.ɵNgSelectMultipleOption, selector: "option", inputs: ["ngValue", "value"] }] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: AmaEditorComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'ama-editor',
                        templateUrl: './ama-editor.component.html',
                        styleUrls: ['./ama-editor.component.scss'],
                    }]
            }], ctorParameters: function () { return []; }, propDecorators: { content: [{
                    type: i0.Input
                }], editorId: [{
                    type: i0.Input
                }], isPreview: [{
                    type: i0.Input
                }], changeEvent: [{
                    type: i0.Output
                }] } });

    var GreenButtonComponent = /** @class */ (function () {
        function GreenButtonComponent() {
            this.reference = '#';
            this.insideText = '';
        }
        GreenButtonComponent.prototype.ngOnInit = function () {
        };
        return GreenButtonComponent;
    }());
    GreenButtonComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: GreenButtonComponent, deps: [], target: i0__namespace.ɵɵFactoryTarget.Component });
    GreenButtonComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.17", type: GreenButtonComponent, selector: "lib-green-button", inputs: { reference: "reference", insideText: "insideText" }, ngImport: i0__namespace, template: "\n <a class=\"btn rounded-pill ama-btn-sucess\" [href]=\"reference\" role=\"button\">\n   <span class=\"mr-1\">{{insideText}}</span>\n    <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\"\n     class=\"bi bi-plus-circle\" viewBox=\"0 0 16 16\">\n     <path d=\"M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z\" />\n      <path\n       d=\"M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z\" />\n      </svg>\n   </a>\n  ", isInline: true, styles: [".ama-btn-sucess {\n    color: white;\n    background-color: #3A8241;\n    border: solid 2px #3A8241;\n}\n\n.ama-btn-sucess:hover {\n    color: #3A8241;\n    background-color: white;\n    border: solid 2px #3A8241;\n}"] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: GreenButtonComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'lib-green-button',
                        template: "\n <a class=\"btn rounded-pill ama-btn-sucess\" [href]=\"reference\" role=\"button\">\n   <span class=\"mr-1\">{{insideText}}</span>\n    <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\"\n     class=\"bi bi-plus-circle\" viewBox=\"0 0 16 16\">\n     <path d=\"M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z\" />\n      <path\n       d=\"M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z\" />\n      </svg>\n   </a>\n  ",
                        styles: [".ama-btn-sucess {\n    color: white;\n    background-color: #3A8241;\n    border: solid 2px #3A8241;\n}\n\n.ama-btn-sucess:hover {\n    color: #3A8241;\n    background-color: white;\n    border: solid 2px #3A8241;\n}"
                        ]
                    }]
            }], ctorParameters: function () { return []; }, propDecorators: { reference: [{
                    type: i0.Input
                }], insideText: [{
                    type: i0.Input
                }] } });

    var BlueButtonComponent = /** @class */ (function () {
        function BlueButtonComponent() {
            this.reference = '#';
            this.insideText = '';
        }
        BlueButtonComponent.prototype.ngOnInit = function () {
        };
        return BlueButtonComponent;
    }());
    BlueButtonComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: BlueButtonComponent, deps: [], target: i0__namespace.ɵɵFactoryTarget.Component });
    BlueButtonComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.17", type: BlueButtonComponent, selector: "lib-blue-button", inputs: { reference: "reference", insideText: "insideText" }, ngImport: i0__namespace, template: "\n <a class=\"btn rounded-pill ama-btn-secondary\" href={{reference}} role=\"button\">\n              <span class=\"mr-1\">{{insideText}}</span>\n              <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-eye-fill\"\n                viewBox=\"0 0 16 16\">\n                <path d=\"M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z\" />\n                <path d=\"M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z\" />\n              </svg>\n            </a>\n  ", isInline: true, styles: [".ama-btn-secondary {\n    color: #333399;\n    background-color: white;\n    border: solid 2px #333399;\n}\n.ama-btn-secondary:hover {\n    color: white;\n    background-color: #333399;\n    border: solid 2px #333399;\n}"] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: BlueButtonComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'lib-blue-button',
                        template: "\n <a class=\"btn rounded-pill ama-btn-secondary\" href={{reference}} role=\"button\">\n              <span class=\"mr-1\">{{insideText}}</span>\n              <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-eye-fill\"\n                viewBox=\"0 0 16 16\">\n                <path d=\"M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z\" />\n                <path d=\"M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z\" />\n              </svg>\n            </a>\n  ",
                        styles: [".ama-btn-secondary {\n    color: #333399;\n    background-color: white;\n    border: solid 2px #333399;\n}\n.ama-btn-secondary:hover {\n    color: white;\n    background-color: #333399;\n    border: solid 2px #333399;\n}"
                        ]
                    }]
            }], ctorParameters: function () { return []; }, propDecorators: { reference: [{
                    type: i0.Input
                }], insideText: [{
                    type: i0.Input
                }] } });

    var PageNameTitleComponent = /** @class */ (function () {
        function PageNameTitleComponent() {
            this.pageName = '';
            this.pageTitle = '';
        }
        PageNameTitleComponent.prototype.ngOnInit = function () {
        };
        return PageNameTitleComponent;
    }());
    PageNameTitleComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: PageNameTitleComponent, deps: [], target: i0__namespace.ɵɵFactoryTarget.Component });
    PageNameTitleComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.17", type: PageNameTitleComponent, selector: "lib-page-name-title", inputs: { pageName: "pageName", pageTitle: "pageTitle" }, ngImport: i0__namespace, template: "\n  <div>\n      <a href=\"\">\n        <p class=\"m-0 h2 text-ama\">{{pageName}}\n          <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"25\" height=\"25\" fill=\"currentColor\"\n            class=\"bi bi-arrow-up-right\" viewBox=\"0 0 16 16\">\n            <path fill-rule=\"evenodd\"\n              d=\"M14 2.5a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0 0 1h4.793L2.146 13.146a.5.5 0 0 0 .708.708L13 3.707V8.5a.5.5 0 0 0 1 0v-6z\" />\n          </svg>\n        </p>\n      </a>\n      <h1>{{pageTitle}}</h1>\n    </div>\n  ", isInline: true, styles: [".text-ama {\n    color: #333399;\n} "] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: PageNameTitleComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'lib-page-name-title',
                        template: "\n  <div>\n      <a href=\"\">\n        <p class=\"m-0 h2 text-ama\">{{pageName}}\n          <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"25\" height=\"25\" fill=\"currentColor\"\n            class=\"bi bi-arrow-up-right\" viewBox=\"0 0 16 16\">\n            <path fill-rule=\"evenodd\"\n              d=\"M14 2.5a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0 0 1h4.793L2.146 13.146a.5.5 0 0 0 .708.708L13 3.707V8.5a.5.5 0 0 0 1 0v-6z\" />\n          </svg>\n        </p>\n      </a>\n      <h1>{{pageTitle}}</h1>\n    </div>\n  ",
                        styles: [".text-ama {\n    color: #333399;\n} "
                        ]
                    }]
            }], ctorParameters: function () { return []; }, propDecorators: { pageName: [{
                    type: i0.Input
                }], pageTitle: [{
                    type: i0.Input
                }] } });

    var AmaCommonModule = /** @class */ (function () {
        function AmaCommonModule() {
        }
        return AmaCommonModule;
    }());
    AmaCommonModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: AmaCommonModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    AmaCommonModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: AmaCommonModule, declarations: [AmaEditorComponent,
            BlueButtonComponent,
            GreenButtonComponent,
            PageNameTitleComponent], imports: [i2.CommonModule,
            i3.FormsModule,
            i3.ReactiveFormsModule, i1__namespace.QuillModule], exports: [AmaEditorComponent,
            BlueButtonComponent,
            GreenButtonComponent,
            PageNameTitleComponent] });
    AmaCommonModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: AmaCommonModule, imports: [[
                i2.CommonModule,
                i3.FormsModule,
                i3.ReactiveFormsModule,
                i1.QuillModule.forRoot(),
            ]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: AmaCommonModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [
                            AmaEditorComponent,
                            BlueButtonComponent,
                            GreenButtonComponent,
                            PageNameTitleComponent
                        ],
                        imports: [
                            i2.CommonModule,
                            i3.FormsModule,
                            i3.ReactiveFormsModule,
                            i1.QuillModule.forRoot(),
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

    exports.AmaCommonComponent = AmaCommonComponent;
    exports.AmaCommonModule = AmaCommonModule;
    exports.AmaCommonService = AmaCommonService;
    exports.AmaEditorComponent = AmaEditorComponent;
    exports.BlueButtonComponent = BlueButtonComponent;
    exports.GreenButtonComponent = GreenButtonComponent;
    exports.PageNameTitleComponent = PageNameTitleComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=ama-common.umd.js.map
