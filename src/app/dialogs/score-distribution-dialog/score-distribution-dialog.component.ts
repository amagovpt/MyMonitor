import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-score-distribution-dialog',
  templateUrl: './score-distribution-dialog.component.html',
  styleUrls: ['./score-distribution-dialog.component.scss']
})
export class ScoreDistributionDialogComponent implements OnInit {

  @ViewChild('chartDomains', { static: true }) chartDomains: any;
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
    this.translate.get(['DIALOGS.scores.percentage', 'DIALOGS.scores.frequency', 'DIALOGS.scores.percentage_label', 'DIALOGS.scores.range'])
      .subscribe(res => {

      const frequencies = new Array<number>(9).fill(0);

      for (const p of this.data.pages) {
        const floor = Math.floor(p.Score);
        frequencies[ floor >= 2 ? floor === 10 ? floor - 2 : floor - 1 : 0]++;
      }

      this.values = frequencies;
      const total = this.values.reduce((a, b) => { return a + b; }, 0);

      this.percentageValues = this.values.map((v) => {
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
              label: res['DIALOGS.scores.frequency'],
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
          maintainAspectRatio: false,
          scales: {
            yAxes: [{
              display: true,
              ticks: {
                beginAtZero: true,
                steps: 1,
                stepValue: 1,
                max: 100
              },
              scaleLabel: {
                display: true,
                labelString: res['DIALOGS.scores.percentage_label']
              }
            }],
            xAxes: [{
              display: true,
              scaleLabel: {
                display: true,
                labelString: res['DIALOGS.scores.range']
              }
            }]
          },
          tooltips: {
            callbacks: {
              label: (tooltipItem) => {
                return [res['DIALOGS.scores.percentage'] + ': ' + tooltipItem.yLabel.toFixed(1) + '%', res['DIALOGS.scores.frequency'] + ': ' + this.values[tooltipItem.index]];
              }
            }
          }
        }
      });
    });
  }
}
