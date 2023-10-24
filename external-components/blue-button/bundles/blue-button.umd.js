(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core')) :
    typeof define === 'function' && define.amd ? define('blue-button', ['exports', '@angular/core'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global["blue-button"] = {}, global.ng.core));
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

    var BlueButtonService = /** @class */ (function () {
        function BlueButtonService() {
        }
        return BlueButtonService;
    }());
    BlueButtonService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: BlueButtonService, deps: [], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    BlueButtonService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: BlueButtonService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: BlueButtonService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return []; } });

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

    var BlueButtonModule = /** @class */ (function () {
        function BlueButtonModule() {
        }
        return BlueButtonModule;
    }());
    BlueButtonModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: BlueButtonModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    BlueButtonModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: BlueButtonModule, declarations: [BlueButtonComponent], exports: [BlueButtonComponent] });
    BlueButtonModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: BlueButtonModule, imports: [[]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: BlueButtonModule, decorators: [{
                type: i0.NgModule,
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

    exports.BlueButtonComponent = BlueButtonComponent;
    exports.BlueButtonModule = BlueButtonModule;
    exports.BlueButtonService = BlueButtonService;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=blue-button.umd.js.map
