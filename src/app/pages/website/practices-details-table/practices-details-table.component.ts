import { Component, Input, OnInit, ViewEncapsulation } from "@angular/core";


@Component({
  encapsulation: ViewEncapsulation.ShadowDom,
  selector: "app-practices-details-table",
  templateUrl: "./practices-details-table.component.html",
  styleUrls: ["./practices-details-table.component.scss"],
})
export class PracticesDetailsTableComponent implements OnInit {
  @Input("type") type: string;
  @Input("data") tableData: any;
  @Input("nPages") nPages: number;

  practices: any;
  practicesKeys: any;

  constructor() {
    this.practicesKeys = new Array<any>();
  }

  ngOnInit() {
    const iterable = this.tableData;
    this.practices = iterable.practicesData;
    this.practicesKeys = iterable.practicesKeys;
  }
}
