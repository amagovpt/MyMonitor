import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPagesErrorsDialogComponent } from './add-pages-errors-dialog.component';

describe('AddPagesErrorsDialogComponent', () => {
  let component: AddPagesErrorsDialogComponent;
  let fixture: ComponentFixture<AddPagesErrorsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPagesErrorsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPagesErrorsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
