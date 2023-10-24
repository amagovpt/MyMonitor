import * as i0 from '@angular/core';
import { Injectable, EventEmitter, Component, Input, Output, NgModule } from '@angular/core';
import * as i1 from 'ngx-quill';
import { QuillModule } from 'ngx-quill';
import * as i2 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i3 from '@angular/forms';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

class AmaEditorService {
    constructor() { }
}
AmaEditorService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: AmaEditorService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
AmaEditorService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: AmaEditorService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: AmaEditorService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
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

class AmaEditorModule {
}
AmaEditorModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: AmaEditorModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AmaEditorModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: AmaEditorModule, declarations: [AmaEditorComponent], imports: [ReactiveFormsModule,
        FormsModule,
        CommonModule, i1.QuillModule], exports: [AmaEditorComponent] });
AmaEditorModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: AmaEditorModule, imports: [[
            ReactiveFormsModule,
            FormsModule,
            CommonModule,
            QuillModule.forRoot(),
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: AmaEditorModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        AmaEditorComponent
                    ],
                    imports: [
                        ReactiveFormsModule,
                        FormsModule,
                        CommonModule,
                        QuillModule.forRoot(),
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

export { AmaEditorComponent, AmaEditorModule, AmaEditorService };
//# sourceMappingURL=ama-editor.js.map
