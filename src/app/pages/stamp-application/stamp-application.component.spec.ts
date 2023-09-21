import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StampApplicationComponent } from './stamp-application.component';

describe('StampApplicationComponent', () => {
  let component: StampApplicationComponent;
  let fixture: ComponentFixture<StampApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StampApplicationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StampApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
