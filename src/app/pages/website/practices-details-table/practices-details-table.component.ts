import { Component, OnInit, Input } from "@angular/core";
import clone from "lodash.clone";


@Component({
  selector: "app-practices-details-table",
  templateUrl: "./practices-details-table.component.html",
  styleUrls: ["./practices-details-table.component.scss"],
})
export class PracticesDetailsTableComponent implements OnInit {
  @Input("type") type: string;
  @Input("data") tableData: any;
  @Input("nPages") nPages:number;

  practices: any;
  practicesKeys: any;

  constructor() {
    this.practicesKeys = new Array<any>();
  }

  ngOnInit() {
    console.log(this.type);
    console.log(this.tableData);
    const iterable = this.tableData;
    this.practices = iterable.practicesData;
    this.practicesKeys = iterable.practicesKeys;
  }
}
