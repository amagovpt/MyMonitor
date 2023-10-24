import { NgModule } from '@angular/core';
import { AmaEditorComponent } from './editor/ama-editor.component';
import { QuillModule } from 'ngx-quill';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "ngx-quill";
export class AmaEditorModule {
}
AmaEditorModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: AmaEditorModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AmaEditorModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: AmaEditorModule, declarations: [AmaEditorComponent], imports: [ReactiveFormsModule,
        FormsModule,
        CommonModule, i1.QuillModule], exports: [AmaEditorComponent] });
AmaEditorModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: AmaEditorModule, imports: [[
            ReactiveFormsModule,
            FormsModule,
            CommonModule,
            QuillModule.forRoot(),
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: AmaEditorModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        AmaEditorComponent
                    ],
                    imports: [
                        ReactiveFormsModule,
                        FormsModule,
                        CommonModule,
                        QuillModule.forRoot(),
                    ],
                    exports: [
                        AmaEditorComponent,
                    ]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW1hLWVkaXRvci5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9hbWEtZWRpdG9yL3NyYy9saWIvYW1hLWVkaXRvci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNuRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQ3hDLE9BQU8sRUFBRSxXQUFXLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNsRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7OztBQWdCL0MsTUFBTSxPQUFPLGVBQWU7OzZHQUFmLGVBQWU7OEdBQWYsZUFBZSxpQkFieEIsa0JBQWtCLGFBR2xCLG1CQUFtQjtRQUNuQixXQUFXO1FBQ1gsWUFBWSw2QkFJWixrQkFBa0I7OEdBSVQsZUFBZSxZQVhqQjtZQUNQLG1CQUFtQjtZQUNuQixXQUFXO1lBQ1gsWUFBWTtZQUNaLFdBQVcsQ0FBQyxPQUFPLEVBQUU7U0FDdEI7NEZBTVUsZUFBZTtrQkFmM0IsUUFBUTttQkFBQztvQkFDUixZQUFZLEVBQUU7d0JBQ1osa0JBQWtCO3FCQUNuQjtvQkFDRCxPQUFPLEVBQUU7d0JBQ1AsbUJBQW1CO3dCQUNuQixXQUFXO3dCQUNYLFlBQVk7d0JBQ1osV0FBVyxDQUFDLE9BQU8sRUFBRTtxQkFDdEI7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLGtCQUFrQjtxQkFFbkI7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQW1hRWRpdG9yQ29tcG9uZW50IH0gZnJvbSAnLi9lZGl0b3IvYW1hLWVkaXRvci5jb21wb25lbnQnO1xuaW1wb3J0IHsgUXVpbGxNb2R1bGUgfSBmcm9tICduZ3gtcXVpbGwnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgQW1hRWRpdG9yQ29tcG9uZW50XG4gIF0sXG4gIGltcG9ydHM6IFtcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIENvbW1vbk1vZHVsZSxcbiAgICBRdWlsbE1vZHVsZS5mb3JSb290KCksXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBBbWFFZGl0b3JDb21wb25lbnQsXG5cbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBBbWFFZGl0b3JNb2R1bGUgeyB9XG4iXX0=