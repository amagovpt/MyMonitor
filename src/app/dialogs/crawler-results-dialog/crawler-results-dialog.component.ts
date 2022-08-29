import { Component, OnInit, Inject, ChangeDetectorRef } from "@angular/core";
import { MatCheckboxChange } from "@angular/material/checkbox";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";


import { MonitorService } from "../../services/monitor.service";

@Component({
  selector: "app-crawler-results-dialog",
  templateUrl: "./crawler-results-dialog.component.html",
  styleUrls: ["./crawler-results-dialog.component.scss"],
})
export class CrawlerResultsDialogComponent implements OnInit {
  displayedColumns = ["Uri", "import"];

  pages: Array<any>;
  selection: any = {};//url-> selected


  error = false;
  loading = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialogRef<CrawlerResultsDialogComponent>,
    private monitor: MonitorService,
    private cd: ChangeDetectorRef
  ) {
    this.loading = true;
    this.error = false;
  }

  ngOnInit(): void {
    this.monitor.getCrawlerResults(this.data.startingUrl).subscribe((pages) => {
      if (!pages) {
        this.error = true;
      } else {
        this.pages = pages;
        this.pages.map((page) => {
          this.selection[page.Uri] = false;
        });
      }


      this.loading = false;
      this.cd.detectChanges();
    });
  }
  getSelectedPagesUrl() {
    const pagesUri = [];
    for (const page of this.pages) {
      if (this.selection[page.Uri])
        pagesUri.push(page.Uri)
    }
    return pagesUri;
  }

  choosePages(e: any): void {
    e.preventDefault();
    this.dialog.close(this.getSelectedPagesUrl());
  }

  masterToggle() {
    this.isAllSelected() ?
      this.changeAll(false) :
      this.changeAll(true);
  }

  changeAll(value: boolean) {
    const keys = Object.keys(this.selection);
    for (const key of keys) {
      this.selection[key] = value
    }
  }
  numberSelected() {
    const values = Object.values(this.selection);
    return values.reduce((prev:number, curr) => {
      if (curr)
        prev++;
      return prev;
    }, 0);
  }
  isAllSelected() {
    const values = Object.values(this.selection);
    return values.reduce((prev, curr) => { return prev && curr }, true);
  }
  onChkChange(ob: MatCheckboxChange, page: any) {
    this.selection[page.Uri] = ob.checked;
  }
}
