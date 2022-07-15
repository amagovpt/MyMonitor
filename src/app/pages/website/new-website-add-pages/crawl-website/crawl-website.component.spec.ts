import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrawlWebsiteComponent } from './crawl-website.component';

describe('CrawlWebsiteComponent', () => {
  let component: CrawlWebsiteComponent;
  let fixture: ComponentFixture<CrawlWebsiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrawlWebsiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrawlWebsiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
