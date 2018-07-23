import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementResultComponent } from './element-result.component';

describe('ElementResultComponent', () => {
  let component: ElementResultComponent;
  let fixture: ComponentFixture<ElementResultComponent>;

  beforeEach(async(() => {
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
