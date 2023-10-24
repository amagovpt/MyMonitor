(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('ngx-quill'), require('@angular/common'), require('@angular/forms')) :
    typeof define === 'function' && define.amd ? define('ama-editor', ['exports', '@angular/core', 'ngx-quill', '@angular/common', '@angular/forms'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global["ama-editor"] = {}, global.ng.core, global.i1, global.ng.common, global.ng.forms));
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

    var AmaEditorService = /** @class */ (function () {
        function AmaEditorService() {
        }
        return AmaEditorService;
    }());
    AmaEditorService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: AmaEditorService, deps: [], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    AmaEditorService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: AmaEditorService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: AmaEditorService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
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

    var AmaEditorModule = /** @class */ (function () {
        function AmaEditorModule() {
        }
        return AmaEditorModule;
    }());
    AmaEditorModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: AmaEditorModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    AmaEditorModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: AmaEditorModule, declarations: [AmaEditorComponent], imports: [i3.ReactiveFormsModule,
            i3.FormsModule,
            i2.CommonModule, i1__namespace.QuillModule], exports: [AmaEditorComponent] });
    AmaEditorModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: AmaEditorModule, imports: [[
                i3.ReactiveFormsModule,
                i3.FormsModule,
                i2.CommonModule,
                i1.QuillModule.forRoot(),
            ]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: AmaEditorModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [
                            AmaEditorComponent
                        ],
                        imports: [
                            i3.ReactiveFormsModule,
                            i3.FormsModule,
                            i2.CommonModule,
                            i1.QuillModule.forRoot(),
                        ],
                        exports: [
                            AmaEditorComponent,
                        ]
                    }]
            }] });

    /*
     * Public API Surface of ama-editor
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.AmaEditorComponent = AmaEditorComponent;
    exports.AmaEditorModule = AmaEditorModule;
    exports.AmaEditorService = AmaEditorService;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=ama-editor.umd.js.map
