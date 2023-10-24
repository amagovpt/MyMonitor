import { Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
export class BlueButtonComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmx1ZS1idXR0b24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvYmx1ZS1idXR0b24vc3JjL2xpYi9ibHVlLWJ1dHRvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxlQUFlLENBQUM7O0FBMEJ6RCxNQUFNLE9BQU8sbUJBQW1CO0lBRzlCO1FBRk8sY0FBUyxHQUFVLEdBQUcsQ0FBQztRQUN2QixlQUFVLEdBQVcsRUFBRSxDQUFBO0lBQ2QsQ0FBQztJQUVqQixRQUFRO0lBQ1IsQ0FBQzs7aUhBTlUsbUJBQW1CO3FHQUFuQixtQkFBbUIscUhBdEJwQjs7Ozs7Ozs7O0dBU1Q7NEZBYVUsbUJBQW1CO2tCQXhCL0IsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsaUJBQWlCO29CQUMzQixRQUFRLEVBQUU7Ozs7Ozs7OztHQVNUO29CQUNELE1BQU0sRUFBRSxDQUFDOzs7Ozs7Ozs7RUFTVDtxQkFDQztpQkFDRjswRUFFUSxTQUFTO3NCQUFqQixLQUFLO2dCQUNHLFVBQVU7c0JBQWxCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbGliLWJsdWUtYnV0dG9uJyxcbiAgdGVtcGxhdGU6IGBcbiA8YSBjbGFzcz1cImJ0biByb3VuZGVkLXBpbGwgYW1hLWJ0bi1zZWNvbmRhcnlcIiBocmVmPXt7cmVmZXJlbmNlfX0gcm9sZT1cImJ1dHRvblwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cIm1yLTFcIj57e2luc2lkZVRleHR9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIxNlwiIGhlaWdodD1cIjE2XCIgZmlsbD1cImN1cnJlbnRDb2xvclwiIGNsYXNzPVwiYmkgYmktZXllLWZpbGxcIlxuICAgICAgICAgICAgICAgIHZpZXdCb3g9XCIwIDAgMTYgMTZcIj5cbiAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTTEwLjUgOGEyLjUgMi41IDAgMSAxLTUgMCAyLjUgMi41IDAgMCAxIDUgMHpcIiAvPlxuICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNMCA4czMtNS41IDgtNS41UzE2IDggMTYgOHMtMyA1LjUtOCA1LjVTMCA4IDAgOHptOCAzLjVhMy41IDMuNSAwIDEgMCAwLTcgMy41IDMuNSAwIDAgMCAwIDd6XCIgLz5cbiAgICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgICA8L2E+XG4gIGAsXG4gIHN0eWxlczogW2AuYW1hLWJ0bi1zZWNvbmRhcnkge1xuICAgIGNvbG9yOiAjMzMzMzk5O1xuICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICAgIGJvcmRlcjogc29saWQgMnB4ICMzMzMzOTk7XG59XG4uYW1hLWJ0bi1zZWNvbmRhcnk6aG92ZXIge1xuICAgIGNvbG9yOiB3aGl0ZTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzMzMzk5O1xuICAgIGJvcmRlcjogc29saWQgMnB4ICMzMzMzOTk7XG59YFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIEJsdWVCdXR0b25Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuQElucHV0KCkgcmVmZXJlbmNlOiBzdHJpbmcgPScjJztcbkBJbnB1dCgpIGluc2lkZVRleHQ6IHN0cmluZyA9ICcnXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gIH1cblxufVxuIl19