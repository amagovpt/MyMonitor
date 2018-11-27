import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemovePagesConfirmationDialogComponent } from './remove-pages-confirmation-dialog.component';

describe('RemovePagesConfirmationDialogComponent', () => {
  let component: RemovePagesConfirmationDialogComponent;
  let fixture: ComponentFixture<RemovePagesConfirmationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemovePagesConfirmationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemovePagesConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
