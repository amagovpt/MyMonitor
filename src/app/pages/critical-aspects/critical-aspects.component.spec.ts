import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CriticalAspectsComponent } from './critical-aspects.component';

describe('CriticalAspects', () => {
  let component: CriticalAspectsComponent;
  let fixture: ComponentFixture<CriticalAspectsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CriticalAspectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriticalAspectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
