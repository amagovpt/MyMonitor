import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  encapsulation: ViewEncapsulation.ShadowDom,
  selector: 'app-remove-pages-confirmation-dialog',
  templateUrl: './remove-pages-confirmation-dialog.component.html',
  styleUrls: ['./remove-pages-confirmation-dialog.component.scss']
})
export class RemovePagesConfirmationDialogComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
