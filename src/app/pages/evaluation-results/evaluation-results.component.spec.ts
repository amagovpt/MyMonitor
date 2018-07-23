import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationResultsComponent } from './evaluation-results.component';

describe('EvaluationResultsComponent', () => {
  let component: EvaluationResultsComponent;
  let fixture: ComponentFixture<EvaluationResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluationResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluationResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
