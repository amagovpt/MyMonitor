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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JlZW4tYnV0dG9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2FtYS1jb21tb24vc3JjL2xpYi9ncmVlbi1idXR0b24vZ3JlZW4tYnV0dG9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBVSxNQUFNLGVBQWUsQ0FBQzs7QUE0QnpELE1BQU0sT0FBTyxvQkFBb0I7SUFHL0I7UUFGUyxjQUFTLEdBQVUsR0FBRyxDQUFDO1FBQ3ZCLGVBQVUsR0FBVyxFQUFFLENBQUE7SUFDaEIsQ0FBQztJQUVqQixRQUFRO0lBQ1IsQ0FBQzs7a0hBTlUsb0JBQW9CO3NHQUFwQixvQkFBb0Isc0hBeEJyQjs7Ozs7Ozs7OztHQVVUOzRGQWNVLG9CQUFvQjtrQkExQmhDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGtCQUFrQjtvQkFDNUIsUUFBUSxFQUFFOzs7Ozs7Ozs7O0dBVVQ7b0JBQ0QsTUFBTSxFQUFFLENBQUM7Ozs7Ozs7Ozs7RUFVVDtxQkFDQztpQkFDRjswRUFFVSxTQUFTO3NCQUFqQixLQUFLO2dCQUNHLFVBQVU7c0JBQWxCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbGliLWdyZWVuLWJ1dHRvbicsXG4gIHRlbXBsYXRlOiBgXG4gPGEgY2xhc3M9XCJidG4gcm91bmRlZC1waWxsIGFtYS1idG4tc3VjZXNzXCIgW2hyZWZdPVwicmVmZXJlbmNlXCIgcm9sZT1cImJ1dHRvblwiPlxuICAgPHNwYW4gY2xhc3M9XCJtci0xXCI+e3tpbnNpZGVUZXh0fX08L3NwYW4+XG4gICAgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIxNlwiIGhlaWdodD1cIjE2XCIgZmlsbD1cImN1cnJlbnRDb2xvclwiXG4gICAgIGNsYXNzPVwiYmkgYmktcGx1cy1jaXJjbGVcIiB2aWV3Qm94PVwiMCAwIDE2IDE2XCI+XG4gICAgIDxwYXRoIGQ9XCJNOCAxNUE3IDcgMCAxIDEgOCAxYTcgNyAwIDAgMSAwIDE0em0wIDFBOCA4IDAgMSAwIDggMGE4IDggMCAwIDAgMCAxNnpcIiAvPlxuICAgICAgPHBhdGhcbiAgICAgICBkPVwiTTggNGEuNS41IDAgMCAxIC41LjV2M2gzYS41LjUgMCAwIDEgMCAxaC0zdjNhLjUuNSAwIDAgMS0xIDB2LTNoLTNhLjUuNSAwIDAgMSAwLTFoM3YtM0EuNS41IDAgMCAxIDggNHpcIiAvPlxuICAgICAgPC9zdmc+XG4gICA8L2E+XG4gIGAsXG4gIHN0eWxlczogW2AuYW1hLWJ0bi1zdWNlc3Mge1xuICAgIGNvbG9yOiB3aGl0ZTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjM0E4MjQxO1xuICAgIGJvcmRlcjogc29saWQgMnB4ICMzQTgyNDE7XG59XG5cbi5hbWEtYnRuLXN1Y2Vzczpob3ZlciB7XG4gICAgY29sb3I6ICMzQTgyNDE7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gICAgYm9yZGVyOiBzb2xpZCAycHggIzNBODI0MTtcbn1gXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgR3JlZW5CdXR0b25Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSByZWZlcmVuY2U6IHN0cmluZyA9JyMnO1xuICBASW5wdXQoKSBpbnNpZGVUZXh0OiBzdHJpbmcgPSAnJ1xuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICB9XG5cbn1cbiJdfQ==