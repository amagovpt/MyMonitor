import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddObservatoryComponent } from './add-observatory.component';

describe('AddObservatoryComponent', () => {
  let component: AddObservatoryComponent;
  let fixture: ComponentFixture<AddObservatoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddObservatoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddObservatoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
