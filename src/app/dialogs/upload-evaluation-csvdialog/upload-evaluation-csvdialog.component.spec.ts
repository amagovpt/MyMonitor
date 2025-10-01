import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadEvaluationCSVDialogComponent } from './upload-evaluation-csvdialog.component';

describe('UploadEvaluationCSVDialogComponent', () => {
  let component: UploadEvaluationCSVDialogComponent;
  let fixture: ComponentFixture<UploadEvaluationCSVDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadEvaluationCSVDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadEvaluationCSVDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
