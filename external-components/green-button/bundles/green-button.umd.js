(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core')) :
    typeof define === 'function' && define.amd ? define('green-button', ['exports', '@angular/core'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global["green-button"] = {}, global.ng.core));
})(this, (function (exports, i0) { 'use strict';

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

    var GreenButtonService = /** @class */ (function () {
        function GreenButtonService() {
        }
        return GreenButtonService;
    }());
    GreenButtonService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: GreenButtonService, deps: [], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    GreenButtonService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: GreenButtonService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: GreenButtonService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return []; } });

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

    var GreenButtonModule = /** @class */ (function () {
        function GreenButtonModule() {
        }
        return GreenButtonModule;
    }());
    GreenButtonModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: GreenButtonModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    GreenButtonModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: GreenButtonModule, declarations: [GreenButtonComponent], exports: [GreenButtonComponent] });
    GreenButtonModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: GreenButtonModule, imports: [[]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: GreenButtonModule, decorators: [{
                type: i0.NgModule,
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

    exports.GreenButtonComponent = GreenButtonComponent;
    exports.GreenButtonModule = GreenButtonModule;
    exports.GreenButtonService = GreenButtonService;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=green-button.umd.js.map
