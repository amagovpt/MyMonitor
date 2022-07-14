import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewWebsiteAddPagesComponent } from './new-website-add-pages.component';

describe('NewWebsiteAddPagesComponent', () => {
  let component: NewWebsiteAddPagesComponent;
  let fixture: ComponentFixture<NewWebsiteAddPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewWebsiteAddPagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewWebsiteAddPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
