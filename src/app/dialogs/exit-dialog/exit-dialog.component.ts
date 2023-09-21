import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  encapsulation: ViewEncapsulation.ShadowDom,
  selector: 'app-exit-dialog',
  templateUrl: './exit-dialog.component.html',
  styleUrls: ['./exit-dialog.component.scss']
})
export class ExitDialogComponent implements OnInit {
  @Input("title") title: string;

  constructor() { }

  ngOnInit(): void {
  }

}
