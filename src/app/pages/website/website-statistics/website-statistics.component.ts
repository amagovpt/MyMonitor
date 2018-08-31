import { Component, OnInit, Input, HostListener } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';

import { ScoreDistributionDialogComponent } from '../../../dialogs/score-distribution-dialog/score-distribution-dialog.component';
import { ErrorDistributionDialogComponent } from '../../../dialogs/error-distribution-dialog/error-distribution-dialog.component';

@Component({
  selector: 'app-website-statistics',
  templateUrl: './website-statistics.component.html',
  styleUrls: ['./website-statistics.component.css']
})
export class WebsiteStatisticsComponent implements OnInit {

  @Input('pages') pages: Array<any>;

  n_cols: number;
  colspan: number;
  rowHeight: string;

  score: number;
  newest_page: string;
  oldest_page: string;

  thresholdConfig: any;

  constructor(private dialog: MatDialog) {
    this.thresholdConfig = {
      '0': {color: 'red'},
      '2.5': {color: 'orange'},
      '5': {color: 'yellow'},
      '7.5': {color: 'green'}
    };

    if (window.innerWidth < 960) {
      this.n_cols = 1;
      this.colspan = 1;
      this.rowHeight = '0.5:0.3';
    } else {
      this.n_cols = 3;
      this.colspan = 2;
      this.rowHeight = '1.5:1';
    }

    this.score = 0;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (event.target.innerWidth < 960) {
      this.n_cols = 1;
    } else {
      this.n_cols = 3;
    }
  }

  ngOnInit(): void {
    this.newest_page = this.pages[0].Evaluation_Date;
    this.oldest_page = this.pages[0].Evaluation_Date;

    for (let p of this.pages) {
      this.score += p.Score;

      if (p.Evaluation_Date > this.newest_page) {
        this.newest_page = p.Evaluation_Date;
      } else if (p.Evaluation_Date < this.oldest_page) {
        this.oldest_page = p.Evaluation_Date;
      }
    }

    this.score = this.score / this.pages.length;
  }

  openScoreDistributionDialog(): void {
    this.dialog.open(ScoreDistributionDialogComponent, {
      data: {
        number: this.pages.length,
        pages: this.pages
      },
      width: '900px'
    });
  }

  openErrorDistributionDialog(): void {
    this.dialog.open(ErrorDistributionDialogComponent, {
      data: {
        pages: this.pages
      },
      width: '900px'
    });
  }
}