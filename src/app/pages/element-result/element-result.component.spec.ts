import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ElementResultComponent } from './element-result.component';

describe('ElementResultComponent', () => {
  let component: ElementResultComponent;
  let fixture: ComponentFixture<ElementResultComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ElementResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
