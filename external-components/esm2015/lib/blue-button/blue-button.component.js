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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmx1ZS1idXR0b24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYW1hLWNvbW1vbi9zcmMvbGliL2JsdWUtYnV0dG9uL2JsdWUtYnV0dG9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBVSxNQUFNLGVBQWUsQ0FBQzs7QUEwQnpELE1BQU0sT0FBTyxtQkFBbUI7SUFHOUI7UUFGTyxjQUFTLEdBQVUsR0FBRyxDQUFDO1FBQ3ZCLGVBQVUsR0FBVyxFQUFFLENBQUE7SUFDZCxDQUFDO0lBRWpCLFFBQVE7SUFDUixDQUFDOztpSEFOVSxtQkFBbUI7cUdBQW5CLG1CQUFtQixxSEF0QnBCOzs7Ozs7Ozs7R0FTVDs0RkFhVSxtQkFBbUI7a0JBeEIvQixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxpQkFBaUI7b0JBQzNCLFFBQVEsRUFBRTs7Ozs7Ozs7O0dBU1Q7b0JBQ0QsTUFBTSxFQUFFLENBQUM7Ozs7Ozs7OztFQVNUO3FCQUNDO2lCQUNGOzBFQUVRLFNBQVM7c0JBQWpCLEtBQUs7Z0JBQ0csVUFBVTtzQkFBbEIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdsaWItYmx1ZS1idXR0b24nLFxuICB0ZW1wbGF0ZTogYFxuIDxhIGNsYXNzPVwiYnRuIHJvdW5kZWQtcGlsbCBhbWEtYnRuLXNlY29uZGFyeVwiIGhyZWY9e3tyZWZlcmVuY2V9fSByb2xlPVwiYnV0dG9uXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibXItMVwiPnt7aW5zaWRlVGV4dH19PC9zcGFuPlxuICAgICAgICAgICAgICA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIjE2XCIgaGVpZ2h0PVwiMTZcIiBmaWxsPVwiY3VycmVudENvbG9yXCIgY2xhc3M9XCJiaSBiaS1leWUtZmlsbFwiXG4gICAgICAgICAgICAgICAgdmlld0JveD1cIjAgMCAxNiAxNlwiPlxuICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNMTAuNSA4YTIuNSAyLjUgMCAxIDEtNSAwIDIuNSAyLjUgMCAwIDEgNSAwelwiIC8+XG4gICAgICAgICAgICAgICAgPHBhdGggZD1cIk0wIDhzMy01LjUgOC01LjVTMTYgOCAxNiA4cy0zIDUuNS04IDUuNVMwIDggMCA4em04IDMuNWEzLjUgMy41IDAgMSAwIDAtNyAzLjUgMy41IDAgMCAwIDAgN3pcIiAvPlxuICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgIDwvYT5cbiAgYCxcbiAgc3R5bGVzOiBbYC5hbWEtYnRuLXNlY29uZGFyeSB7XG4gICAgY29sb3I6ICMzMzMzOTk7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gICAgYm9yZGVyOiBzb2xpZCAycHggIzMzMzM5OTtcbn1cbi5hbWEtYnRuLXNlY29uZGFyeTpob3ZlciB7XG4gICAgY29sb3I6IHdoaXRlO1xuICAgIGJhY2tncm91bmQtY29sb3I6ICMzMzMzOTk7XG4gICAgYm9yZGVyOiBzb2xpZCAycHggIzMzMzM5OTtcbn1gXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgQmx1ZUJ1dHRvbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5ASW5wdXQoKSByZWZlcmVuY2U6IHN0cmluZyA9JyMnO1xuQElucHV0KCkgaW5zaWRlVGV4dDogc3RyaW5nID0gJydcbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgfVxuXG59XG4iXX0=