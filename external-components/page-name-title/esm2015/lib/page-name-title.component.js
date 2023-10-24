import { Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
export class PageNameTitleComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS1uYW1lLXRpdGxlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL3BhZ2UtbmFtZS10aXRsZS9zcmMvbGliL3BhZ2UtbmFtZS10aXRsZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxlQUFlLENBQUM7O0FBdUJ6RCxNQUFNLE9BQU8sc0JBQXNCO0lBR2pDO1FBRlMsYUFBUSxHQUFXLEVBQUUsQ0FBQztRQUN0QixjQUFTLEdBQVcsRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFFakIsUUFBUTtJQUNSLENBQUM7O29IQU5VLHNCQUFzQjt3R0FBdEIsc0JBQXNCLHFIQW5CdkI7Ozs7Ozs7Ozs7Ozs7R0FhVDs0RkFNVSxzQkFBc0I7a0JBckJsQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxxQkFBcUI7b0JBQy9CLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7OztHQWFUO29CQUNELE1BQU0sRUFBRSxDQUFDOztHQUVSO3FCQUNBO2lCQUNGOzBFQUVVLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csU0FBUztzQkFBakIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdsaWItcGFnZS1uYW1lLXRpdGxlJyxcbiAgdGVtcGxhdGU6IGBcbiAgPGRpdj5cbiAgICAgIDxhIGhyZWY9XCJcIj5cbiAgICAgICAgPHAgY2xhc3M9XCJtLTAgaDIgdGV4dC1hbWFcIj57e3BhZ2VOYW1lfX1cbiAgICAgICAgICA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIjI1XCIgaGVpZ2h0PVwiMjVcIiBmaWxsPVwiY3VycmVudENvbG9yXCJcbiAgICAgICAgICAgIGNsYXNzPVwiYmkgYmktYXJyb3ctdXAtcmlnaHRcIiB2aWV3Qm94PVwiMCAwIDE2IDE2XCI+XG4gICAgICAgICAgICA8cGF0aCBmaWxsLXJ1bGU9XCJldmVub2RkXCJcbiAgICAgICAgICAgICAgZD1cIk0xNCAyLjVhLjUuNSAwIDAgMC0uNS0uNWgtNmEuNS41IDAgMCAwIDAgMWg0Ljc5M0wyLjE0NiAxMy4xNDZhLjUuNSAwIDAgMCAuNzA4LjcwOEwxMyAzLjcwN1Y4LjVhLjUuNSAwIDAgMCAxIDB2LTZ6XCIgLz5cbiAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgPC9wPlxuICAgICAgPC9hPlxuICAgICAgPGgxPnt7cGFnZVRpdGxlfX08L2gxPlxuICAgIDwvZGl2PlxuICBgLFxuICBzdHlsZXM6IFtgLnRleHQtYW1hIHtcbiAgICBjb2xvcjogIzMzMzM5OTtcbn0gYFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIFBhZ2VOYW1lVGl0bGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBwYWdlTmFtZTogc3RyaW5nID0gJyc7XG4gIEBJbnB1dCgpIHBhZ2VUaXRsZTogc3RyaW5nID0gJyc7XG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gIH1cblxufVxuIl19