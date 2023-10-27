import { NgModule } from '@angular/core';
import { AmaEditorComponent } from './ama-editor/ama-editor.component';
import { BlueButtonComponent } from './blue-button/blue-button.component';
import { GreenButtonComponent } from './green-button/green-button.component';
import { PageNameTitleComponent } from './page-name-title/page-name-title.component';
import { QuillModule } from 'ngx-quill';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "ngx-quill";
export class AmaCommonModule {
}
AmaCommonModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: AmaCommonModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AmaCommonModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: AmaCommonModule, declarations: [AmaEditorComponent,
        BlueButtonComponent,
        GreenButtonComponent,
        PageNameTitleComponent], imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule, i1.QuillModule], exports: [AmaEditorComponent,
        BlueButtonComponent,
        GreenButtonComponent,
        PageNameTitleComponent] });
AmaCommonModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: AmaCommonModule, imports: [[
            CommonModule,
            FormsModule,
            ReactiveFormsModule,
            QuillModule.forRoot(),
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: AmaCommonModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        AmaEditorComponent,
                        BlueButtonComponent,
                        GreenButtonComponent,
                        PageNameTitleComponent
                    ],
                    imports: [
                        CommonModule,
                        FormsModule,
                        ReactiveFormsModule,
                        QuillModule.forRoot(),
                    ],
                    exports: [
                        AmaEditorComponent,
                        BlueButtonComponent,
                        GreenButtonComponent,
                        PageNameTitleComponent
                    ]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW1hLWNvbW1vbi5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9hbWEtY29tbW9uL3NyYy9saWIvYW1hLWNvbW1vbi5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUN2RSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUMxRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUM3RSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUNyRixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQ3hDLE9BQU8sRUFBRSxXQUFXLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNsRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7OztBQXVCL0MsTUFBTSxPQUFPLGVBQWU7OzZHQUFmLGVBQWU7OEdBQWYsZUFBZSxpQkFsQnhCLGtCQUFrQjtRQUNsQixtQkFBbUI7UUFDbkIsb0JBQW9CO1FBQ3BCLHNCQUFzQixhQUd0QixZQUFZO1FBQ1osV0FBVztRQUNYLG1CQUFtQiw2QkFJbkIsa0JBQWtCO1FBQ2xCLG1CQUFtQjtRQUNuQixvQkFBb0I7UUFDcEIsc0JBQXNCOzhHQUdiLGVBQWUsWUFiakI7WUFDUCxZQUFZO1lBQ1osV0FBVztZQUNYLG1CQUFtQjtZQUNuQixXQUFXLENBQUMsT0FBTyxFQUFFO1NBQ3RCOzRGQVFVLGVBQWU7a0JBcEIzQixRQUFRO21CQUFDO29CQUNSLFlBQVksRUFBRTt3QkFDWixrQkFBa0I7d0JBQ2xCLG1CQUFtQjt3QkFDbkIsb0JBQW9CO3dCQUNwQixzQkFBc0I7cUJBQ3ZCO29CQUNELE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLFdBQVc7d0JBQ1gsbUJBQW1CO3dCQUNuQixXQUFXLENBQUMsT0FBTyxFQUFFO3FCQUN0QjtvQkFDRCxPQUFPLEVBQUU7d0JBQ1Asa0JBQWtCO3dCQUNsQixtQkFBbUI7d0JBQ25CLG9CQUFvQjt3QkFDcEIsc0JBQXNCO3FCQUN2QjtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBbWFFZGl0b3JDb21wb25lbnQgfSBmcm9tICcuL2FtYS1lZGl0b3IvYW1hLWVkaXRvci5jb21wb25lbnQnO1xuaW1wb3J0IHsgQmx1ZUJ1dHRvbkNvbXBvbmVudCB9IGZyb20gJy4vYmx1ZS1idXR0b24vYmx1ZS1idXR0b24uY29tcG9uZW50JztcbmltcG9ydCB7IEdyZWVuQnV0dG9uQ29tcG9uZW50IH0gZnJvbSAnLi9ncmVlbi1idXR0b24vZ3JlZW4tYnV0dG9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQYWdlTmFtZVRpdGxlQ29tcG9uZW50IH0gZnJvbSAnLi9wYWdlLW5hbWUtdGl0bGUvcGFnZS1uYW1lLXRpdGxlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBRdWlsbE1vZHVsZSB9IGZyb20gJ25neC1xdWlsbCc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgQW1hRWRpdG9yQ29tcG9uZW50LFxuICAgIEJsdWVCdXR0b25Db21wb25lbnQsXG4gICAgR3JlZW5CdXR0b25Db21wb25lbnQsXG4gICAgUGFnZU5hbWVUaXRsZUNvbXBvbmVudFxuICBdLFxuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgUXVpbGxNb2R1bGUuZm9yUm9vdCgpLFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgQW1hRWRpdG9yQ29tcG9uZW50LFxuICAgIEJsdWVCdXR0b25Db21wb25lbnQsXG4gICAgR3JlZW5CdXR0b25Db21wb25lbnQsXG4gICAgUGFnZU5hbWVUaXRsZUNvbXBvbmVudFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIEFtYUNvbW1vbk1vZHVsZSB7IH1cbiJdfQ==