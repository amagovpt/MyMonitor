import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebpageCodeComponent } from './webpage-code.component';

describe('WebpageCodeComponent', () => {
  let component: WebpageCodeComponent;
  let fixture: ComponentFixture<WebpageCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebpageCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebpageCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
