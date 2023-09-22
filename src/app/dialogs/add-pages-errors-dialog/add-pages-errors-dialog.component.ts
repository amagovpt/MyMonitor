import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  encapsulation: ViewEncapsulation.ShadowDom,
  selector: 'app-add-pages-errors-dialog',
  templateUrl: './add-pages-errors-dialog.component.html',
  styleUrls: ['./add-pages-errors-dialog.component.scss']
})
export class AddPagesErrorsDialogComponent implements OnInit {

  pages: Array<string>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.pages = Object.keys(this.data);
  }

}
