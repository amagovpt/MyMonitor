import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrawlerResultsDialogComponent } from './crawler-results-dialog.component';

describe('CrawlerResultsDialogComponent', () => {
  let component: CrawlerResultsDialogComponent;
  let fixture: ComponentFixture<CrawlerResultsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrawlerResultsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrawlerResultsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
