import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  encapsulation: ViewEncapsulation.ShadowDom,
  selector: 'app-background-evaluations-information-dialog',
  templateUrl: './background-evaluations-information-dialog.component.html',
  styleUrls: ['./background-evaluations-information-dialog.component.scss']
})
export class BackgroundEvaluationsInformationDialogComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
