import { Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
export class GreenButtonComponent {
    constructor() {
        this.reference = '#';
        this.insideText = '';
    }
    ngOnInit() {
    }
}
GreenButtonComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: GreenButtonComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
GreenButtonComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.17", type: GreenButtonComponent, selector: "lib-green-button", inputs: { reference: "reference", insideText: "insideText" }, ngImport: i0, template: `
 <a class="btn rounded-pill ama-btn-sucess" [href]="reference" role="button">
   <span class="mr-1">{{insideText}}</span>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
     class="bi bi-plus-circle" viewBox="0 0 16 16">
     <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
      <path
       d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
      </svg>
   </a>
  `, isInline: true, styles: [".ama-btn-sucess {\n    color: white;\n    background-color: #3A8241;\n    border: solid 2px #3A8241;\n}\n\n.ama-btn-sucess:hover {\n    color: #3A8241;\n    background-color: white;\n    border: solid 2px #3A8241;\n}"] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: GreenButtonComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'lib-green-button',
                    template: `
 <a class="btn rounded-pill ama-btn-sucess" [href]="reference" role="button">
   <span class="mr-1">{{insideText}}</span>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
     class="bi bi-plus-circle" viewBox="0 0 16 16">
     <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
      <path
       d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
      </svg>
   </a>
  `,
                    styles: [`.ama-btn-sucess {
    color: white;
    background-color: #3A8241;
    border: solid 2px #3A8241;
}

.ama-btn-sucess:hover {
    color: #3A8241;
    background-color: white;
    border: solid 2px #3A8241;
}`
                    ]
                }]
        }], ctorParameters: function () { return []; }, propDecorators: { reference: [{
                type: Input
            }], insideText: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JlZW4tYnV0dG9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2dyZWVuLWJ1dHRvbi9zcmMvbGliL2dyZWVuLWJ1dHRvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxlQUFlLENBQUM7O0FBNEJ6RCxNQUFNLE9BQU8sb0JBQW9CO0lBRy9CO1FBRlMsY0FBUyxHQUFVLEdBQUcsQ0FBQztRQUN2QixlQUFVLEdBQVcsRUFBRSxDQUFBO0lBQ2hCLENBQUM7SUFFakIsUUFBUTtJQUNSLENBQUM7O2tIQU5VLG9CQUFvQjtzR0FBcEIsb0JBQW9CLHNIQXhCckI7Ozs7Ozs7Ozs7R0FVVDs0RkFjVSxvQkFBb0I7a0JBMUJoQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxrQkFBa0I7b0JBQzVCLFFBQVEsRUFBRTs7Ozs7Ozs7OztHQVVUO29CQUNELE1BQU0sRUFBRSxDQUFDOzs7Ozs7Ozs7O0VBVVQ7cUJBQ0M7aUJBQ0Y7MEVBRVUsU0FBUztzQkFBakIsS0FBSztnQkFDRyxVQUFVO3NCQUFsQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2xpYi1ncmVlbi1idXR0b24nLFxuICB0ZW1wbGF0ZTogYFxuIDxhIGNsYXNzPVwiYnRuIHJvdW5kZWQtcGlsbCBhbWEtYnRuLXN1Y2Vzc1wiIFtocmVmXT1cInJlZmVyZW5jZVwiIHJvbGU9XCJidXR0b25cIj5cbiAgIDxzcGFuIGNsYXNzPVwibXItMVwiPnt7aW5zaWRlVGV4dH19PC9zcGFuPlxuICAgIDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHdpZHRoPVwiMTZcIiBoZWlnaHQ9XCIxNlwiIGZpbGw9XCJjdXJyZW50Q29sb3JcIlxuICAgICBjbGFzcz1cImJpIGJpLXBsdXMtY2lyY2xlXCIgdmlld0JveD1cIjAgMCAxNiAxNlwiPlxuICAgICA8cGF0aCBkPVwiTTggMTVBNyA3IDAgMSAxIDggMWE3IDcgMCAwIDEgMCAxNHptMCAxQTggOCAwIDEgMCA4IDBhOCA4IDAgMCAwIDAgMTZ6XCIgLz5cbiAgICAgIDxwYXRoXG4gICAgICAgZD1cIk04IDRhLjUuNSAwIDAgMSAuNS41djNoM2EuNS41IDAgMCAxIDAgMWgtM3YzYS41LjUgMCAwIDEtMSAwdi0zaC0zYS41LjUgMCAwIDEgMC0xaDN2LTNBLjUuNSAwIDAgMSA4IDR6XCIgLz5cbiAgICAgIDwvc3ZnPlxuICAgPC9hPlxuICBgLFxuICBzdHlsZXM6IFtgLmFtYS1idG4tc3VjZXNzIHtcbiAgICBjb2xvcjogd2hpdGU7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzNBODI0MTtcbiAgICBib3JkZXI6IHNvbGlkIDJweCAjM0E4MjQxO1xufVxuXG4uYW1hLWJ0bi1zdWNlc3M6aG92ZXIge1xuICAgIGNvbG9yOiAjM0E4MjQxO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICAgIGJvcmRlcjogc29saWQgMnB4ICMzQTgyNDE7XG59YFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIEdyZWVuQnV0dG9uQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgcmVmZXJlbmNlOiBzdHJpbmcgPScjJztcbiAgQElucHV0KCkgaW5zaWRlVGV4dDogc3RyaW5nID0gJydcbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgfVxuXG59XG4iXX0=