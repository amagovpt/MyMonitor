import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SitemapAddComponent } from './sitemap-add.component';

describe('SitemapAddComponent', () => {
  let component: SitemapAddComponent;
  let fixture: ComponentFixture<SitemapAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SitemapAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SitemapAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
