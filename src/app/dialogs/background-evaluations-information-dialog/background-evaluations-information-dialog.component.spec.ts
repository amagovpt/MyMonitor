import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackgroundEvaluationsInformationDialogComponent } from './background-evaluations-information-dialog.component';

describe('BackgroundEvaluationsInformationDialogComponent', () => {
  let component: BackgroundEvaluationsInformationDialogComponent;
  let fixture: ComponentFixture<BackgroundEvaluationsInformationDialogComponent>;

  beforeEach(async(() => {
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
