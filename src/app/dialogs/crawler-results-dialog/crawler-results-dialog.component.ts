import { Component, OnInit, Inject, ChangeDetectorRef } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { SelectionModel } from "@angular/cdk/collections";

import { MonitorService } from "../../services/monitor.service";

@Component({
  selector: "app-crawler-results-dialog",
  templateUrl: "./crawler-results-dialog.component.html",
  styleUrls: ["./crawler-results-dialog.component.scss"],
})
export class CrawlerResultsDialogComponent implements OnInit {
  displayedColumns = ["Uri", "import"];

  pages: Array<any>;
  dataSource: MatTableDataSource<any>;
  selectionImport: any;

  error = false;
  loading = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialogRef<CrawlerResultsDialogComponent>,
    private monitor: MonitorService,
    private cd: ChangeDetectorRef
  ) {
    this.selectionImport = new SelectionModel<any>(true, []);
    this.loading = true;
    this.error = false;
  }

  ngOnInit(): void {
    this.monitor.getCrawlerResults(this.data.startingUrl).subscribe((pages) => {
      if (pages) {
        this.dataSource = new MatTableDataSource(pages);
      } else {
        this.error = true;
      }

      this.loading = false;
      this.cd.detectChanges();
    });
  }

  choosePages(e: any): void {
    e.preventDefault();
    this.dialog.close(this.selectionImport.selected.map((p) => p.Uri));
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelectedImport() {
    const numSelected = this.selectionImport.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggleImport() {
    this.isAllSelectedImport()
      ? this.dataSource.data.forEach((row) => {
          this.selectionImport.deselect(row);
        })
      : this.dataSource.data.forEach((row) => this.selectionImport.select(row));
  }
}
