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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS1uYW1lLXRpdGxlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2FtYS1jb21tb24vc3JjL2xpYi9wYWdlLW5hbWUtdGl0bGUvcGFnZS1uYW1lLXRpdGxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBVSxNQUFNLGVBQWUsQ0FBQzs7QUF1QnpELE1BQU0sT0FBTyxzQkFBc0I7SUFHakM7UUFGUyxhQUFRLEdBQVcsRUFBRSxDQUFDO1FBQ3RCLGNBQVMsR0FBVyxFQUFFLENBQUM7SUFDaEIsQ0FBQztJQUVqQixRQUFRO0lBQ1IsQ0FBQzs7b0hBTlUsc0JBQXNCO3dHQUF0QixzQkFBc0IscUhBbkJ2Qjs7Ozs7Ozs7Ozs7OztHQWFUOzRGQU1VLHNCQUFzQjtrQkFyQmxDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLHFCQUFxQjtvQkFDL0IsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7O0dBYVQ7b0JBQ0QsTUFBTSxFQUFFLENBQUM7O0dBRVI7cUJBQ0E7aUJBQ0Y7MEVBRVUsUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxTQUFTO3NCQUFqQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2xpYi1wYWdlLW5hbWUtdGl0bGUnLFxuICB0ZW1wbGF0ZTogYFxuICA8ZGl2PlxuICAgICAgPGEgaHJlZj1cIlwiPlxuICAgICAgICA8cCBjbGFzcz1cIm0tMCBoMiB0ZXh0LWFtYVwiPnt7cGFnZU5hbWV9fVxuICAgICAgICAgIDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHdpZHRoPVwiMjVcIiBoZWlnaHQ9XCIyNVwiIGZpbGw9XCJjdXJyZW50Q29sb3JcIlxuICAgICAgICAgICAgY2xhc3M9XCJiaSBiaS1hcnJvdy11cC1yaWdodFwiIHZpZXdCb3g9XCIwIDAgMTYgMTZcIj5cbiAgICAgICAgICAgIDxwYXRoIGZpbGwtcnVsZT1cImV2ZW5vZGRcIlxuICAgICAgICAgICAgICBkPVwiTTE0IDIuNWEuNS41IDAgMCAwLS41LS41aC02YS41LjUgMCAwIDAgMCAxaDQuNzkzTDIuMTQ2IDEzLjE0NmEuNS41IDAgMCAwIC43MDguNzA4TDEzIDMuNzA3VjguNWEuNS41IDAgMCAwIDEgMHYtNnpcIiAvPlxuICAgICAgICAgIDwvc3ZnPlxuICAgICAgICA8L3A+XG4gICAgICA8L2E+XG4gICAgICA8aDE+e3twYWdlVGl0bGV9fTwvaDE+XG4gICAgPC9kaXY+XG4gIGAsXG4gIHN0eWxlczogW2AudGV4dC1hbWEge1xuICAgIGNvbG9yOiAjMzMzMzk5O1xufSBgXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgUGFnZU5hbWVUaXRsZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIHBhZ2VOYW1lOiBzdHJpbmcgPSAnJztcbiAgQElucHV0KCkgcGFnZVRpdGxlOiBzdHJpbmcgPSAnJztcbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgfVxuXG59XG4iXX0=