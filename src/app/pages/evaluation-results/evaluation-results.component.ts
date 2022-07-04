import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import * as _ from 'lodash';

import { EvaluationService } from '../../services/evaluation.service';

import { BackgroundEvaluationsInformationDialogComponent } from '../../dialogs/background-evaluations-information-dialog/background-evaluations-information-dialog.component';

@Component({
  selector: 'app-evaluation-results',
  templateUrl: './evaluation-results.component.html',
  styleUrls: ['./evaluation-results.component.scss']
})
export class EvaluationResultsComponent implements OnInit, OnDestroy {

  sub: Subscription;

  loading: boolean;
  error: boolean;

  eval: any;
  website: string;
  url: string;

  thresholdConfig: any;

  constructor(
    private evaluation: EvaluationService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private cd: ChangeDetectorRef
  ) {

    this.thresholdConfig = {
      '0': {color: 'red'},
      '2.5': {color: 'orange'},
      '5': {color: 'yellow'},
      '7.5': {color: 'green'}
    };

    this.loading = true;
    this.error = false;
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.website = params.website;
      this.url = params.page;
      this.evaluation.getEvaluation(this.website, this.url)
        .subscribe(data => {
          if (!data) {
            this.error = true;
          } else {
            this.eval = data;
          }

          this.loading = false;
          this.cd.detectChanges();
        });
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  evaluate(): void {
    /*this.loading = true;

    this.evaluation.evaluateUrl(this.url)
      .subscribe(data => {
        if (!data) {
          this.error = true;
        } else {
          this.eval = data;
        }

        this.loading = false;
        this.cd.detectChanges();
      });*/
    
    this.evaluation.evaluateUrl(this.url)
      .subscribe(result => {
        if (result) {
          this.dialog.open(BackgroundEvaluationsInformationDialogComponent, { width: '40vw' });
        } else {
          alert('Error');
        }
      });
  }

  downloadCSV(): void {
    this.evaluation.downloadCSV();
  }

  downloadEARL(): void {
    this.evaluation.downloadEARL();
  }
}
