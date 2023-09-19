import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriticalAspectsPrevisualizationComponent } from './critical-aspects-previsualization.component';

describe('CriticalAspectsPrevisualizationComponent', () => {
  let component: CriticalAspectsPrevisualizationComponent;
  let fixture: ComponentFixture<CriticalAspectsPrevisualizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CriticalAspectsPrevisualizationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CriticalAspectsPrevisualizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
