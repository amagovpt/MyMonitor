import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  encapsulation: ViewEncapsulation.ShadowDom,
  selector: 'app-not-found-404',
  templateUrl: './not-found-404.component.html',
  styleUrls: ['./not-found-404.component.scss']
})
export class NotFound404Component implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
