import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  encapsulation: ViewEncapsulation.ShadowDom,
  selector: 'app-user-auth-error-dialog',
  templateUrl: './user-auth-error-dialog.component.html',
  styleUrls: ['./user-auth-error-dialog.component.scss']
})
export class UserAuthErrorDialogComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
