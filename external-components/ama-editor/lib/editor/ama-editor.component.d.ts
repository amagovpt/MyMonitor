import { AfterViewInit, EventEmitter, OnInit } from '@angular/core';
import * as i0 from "@angular/core";
export declare class AmaEditorComponent implements OnInit, AfterViewInit {
    content: string;
    editorId: string;
    isPreview: boolean;
    changeEvent: EventEmitter<string>;
    constructor();
    ngOnInit(): void;
    ngAfterViewInit(): void;
    textSave(event: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AmaEditorComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AmaEditorComponent, "ama-editor", never, { "content": "content"; "editorId": "editorId"; "isPreview": "isPreview"; }, { "changeEvent": "changeEvent"; }, never, never>;
}
