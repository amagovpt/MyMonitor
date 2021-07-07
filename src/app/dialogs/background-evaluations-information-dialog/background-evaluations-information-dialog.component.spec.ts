import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BackgroundEvaluationsInformationDialogComponent } from './background-evaluations-information-dialog.component';

describe('BackgroundEvaluationsInformationDialogComponent', () => {
  let component: BackgroundEvaluationsInformationDialogComponent;
  let fixture: ComponentFixture<BackgroundEvaluationsInformationDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BackgroundEvaluationsInformationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackgroundEvaluationsInformationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
