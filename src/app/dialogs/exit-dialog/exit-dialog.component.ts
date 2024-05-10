import { Component, Input, OnInit } from '@angular/core';

@Component({
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
