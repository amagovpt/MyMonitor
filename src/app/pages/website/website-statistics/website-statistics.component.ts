import { Component, OnInit, Input, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ScoreDistributionDialogComponent } from '../../../dialogs/score-distribution-dialog/score-distribution-dialog.component';
import { ErrorDistributionDialogComponent } from '../../../dialogs/error-distribution-dialog/error-distribution-dialog.component';
import { CorrectionDistributionDialogComponent } from '../../../dialogs/correction-distribution-dialog/correction-distribution-dialog.component';
import { Website } from 'src/app/models/website';

@Component({
  selector: 'app-website-statistics',
  templateUrl: './website-statistics.component.html',
  styleUrls: ['./website-statistics.component.scss']
})
export class WebsiteStatisticsComponent implements OnInit {

  @Input('data') websiteObject: Website;
  @Input('pages') pages: Array<any>;

  dialogWidth: string;

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

    this.score = 0;

    if (window.innerWidth < 960) {
      this.dialogWidth = '100vw';
    } else {
      this.dialogWidth = '80vw';
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (event.target.innerWidth < 960) {
      this.dialogWidth = '100vw';
    } else {
      this.dialogWidth = '80vw';
    }
  }

  ngOnInit(): void {
    this.newest_page = this.pages[0].Evaluation_Date;
    this.oldest_page = this.pages[0].Evaluation_Date;

    for (const p of this.pages) {
      this.score += parseFloat(p.Score);

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
      width: this.dialogWidth
    });
  }

  openErrorDistributionDialog(): void {
    this.dialog.open(ErrorDistributionDialogComponent, {
      data: {
        website: this.websiteObject
      },
      width: this.dialogWidth
    });
  }

  openCorrectionDistributionDialog(): void {
    this.dialog.open(CorrectionDistributionDialogComponent, {
      data: {
        website: this.websiteObject
      },
      width: this.dialogWidth,
    });
  }
}
