(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core')) :
    typeof define === 'function' && define.amd ? define('page-name-title', ['exports', '@angular/core'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global["page-name-title"] = {}, global.ng.core));
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

    var PageNameTitleService = /** @class */ (function () {
        function PageNameTitleService() {
        }
        return PageNameTitleService;
    }());
    PageNameTitleService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: PageNameTitleService, deps: [], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    PageNameTitleService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: PageNameTitleService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: PageNameTitleService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return []; } });

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

    var PageNameTitleModule = /** @class */ (function () {
        function PageNameTitleModule() {
        }
        return PageNameTitleModule;
    }());
    PageNameTitleModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: PageNameTitleModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    PageNameTitleModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: PageNameTitleModule, declarations: [PageNameTitleComponent], exports: [PageNameTitleComponent] });
    PageNameTitleModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: PageNameTitleModule, imports: [[]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: PageNameTitleModule, decorators: [{
                type: i0.NgModule,
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

    exports.PageNameTitleComponent = PageNameTitleComponent;
    exports.PageNameTitleModule = PageNameTitleModule;
    exports.PageNameTitleService = PageNameTitleService;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=page-name-title.umd.js.map
