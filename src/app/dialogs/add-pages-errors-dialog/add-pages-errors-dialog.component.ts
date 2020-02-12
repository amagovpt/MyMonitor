import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as _ from 'lodash';

@Component({
  selector: 'app-add-pages-errors-dialog',
  templateUrl: './add-pages-errors-dialog.component.html',
  styleUrls: ['./add-pages-errors-dialog.component.css']
})
export class AddPagesErrorsDialogComponent implements OnInit {

  pages: Array<string>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.pages = _.keys(this.data);
  }

}
