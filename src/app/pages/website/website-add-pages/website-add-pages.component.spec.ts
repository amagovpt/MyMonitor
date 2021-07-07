import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { WebsiteAddPagesComponent } from './website-add-pages.component';

describe('WebsiteAddPagesComponent', () => {
  let component: WebsiteAddPagesComponent;
  let fixture: ComponentFixture<WebsiteAddPagesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WebsiteAddPagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebsiteAddPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
