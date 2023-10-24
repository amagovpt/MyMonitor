import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedChecklistComponent } from './shared-checklist.component';

describe('ChecklistComponent', () => {
  let component: SharedChecklistComponent;
  let fixture: ComponentFixture<SharedChecklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharedChecklistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
