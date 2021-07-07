import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrawlerResultsDialogComponent } from './crawler-results-dialog.component';

describe('CrawlerResultsDialogComponent', () => {
  let component: CrawlerResultsDialogComponent;
  let fixture: ComponentFixture<CrawlerResultsDialogComponent>;

  beforeEach(waitForAsync(() => {
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
