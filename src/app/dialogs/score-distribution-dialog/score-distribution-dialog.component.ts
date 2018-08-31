import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Chart } from 'chart.js';
import * as _ from 'lodash';


@Component({
  selector: 'app-score-distribution-dialog',
  templateUrl: './score-distribution-dialog.component.html',
  styleUrls: ['./score-distribution-dialog.component.css']
})
export class ScoreDistributionDialogComponent implements OnInit {

  @ViewChild('chartDomains') chartDomains: any;
  chart: any;

  labels: string[];
  values: number[];
  percentageValues: number[];
  freq: number[];
  freqPer: number[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private translate: TranslateService) {
    this.labels = [
      '[1 - 2[',
      '[2 - 3[',
      '[3 - 4[',
      '[4 - 5[',
      '[5 - 6[',
      '[6 - 7[',
      '[7 - 8[',
      '[8 - 9[',
      '[9 - 10]'
    ];
    this.values = [];
    this.freq = [];
    this.freqPer = [];
  }

  ngOnInit(): void {
    this.translate.get(['DIALOGS.scores.percentage', 'DIALOGS.scores.frequencie'])
      .subscribe(res => {

      let frequencies = new Array<number>(10).fill(0);

      for (let p of this.data.pages) {
        frequencies[_.floor(p.Score) - 1]++;
      }

      this.values = frequencies;
      const total = _.sum(this.values);

      this.percentageValues = _.map(this.values, (v) => {
        return (v / total) * 100;
      });

      let tmp = 0;
      for (let i = 0 ; i < 10 ; i++) {
        this.freq[i] = tmp += this.values[i];
      }

      let tmpPer = 0;
      for (let i = 0 ; i < 10 ; i++) {
        this.freqPer[i] = tmpPer += this.percentageValues[i];
      }

      this.chart = new Chart(this.chartDomains.nativeElement, {
        type: 'bar',
        data: {
          labels: this.labels,
          datasets: [
            {
              label: res['DIALOGS.scores.percentage'],
              data: this.freqPer,
              type: 'line',
              backgroundColor: 'lightgray',
              lineTension: 0,
              fill: false,
              pointBackgroundColor: 'red',
              pointBorderColor: 'white',
              borderColor: 'blue'
            },
            {
              label: res['DIALOGS.scores.frequencie'],
              data: this.percentageValues,
              backgroundColor: [
                'red',
                'red',
                'orange',
                'orange',
                'yellow',
                'yellow',
                'yellow',
                'green',
                'green',
                'lightgreen'
              ]
            }
          ]
        },
        options: {
          scales: {
            yAxes: [{
              display: true,
              ticks: {
                beginAtZero: true,
                steps: 1,
                stepValue: 1,
                max: 100
              }
            }]
          },
          tooltips: {
            callbacks: {
              label: (tooltipItem) => {
                return [res['DIALOGS.scores.percentage'] + ': ' + tooltipItem.yLabel.toFixed(1) + '%', res['DIALOGS.scores.frequencie'] + ': ' + this.values[tooltipItem.index]];
              }
            }
          }
        }
      });
    });
  }
}