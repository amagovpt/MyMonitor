import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MonitorService } from 'src/app/services/monitor.service';
import { BackgroundEvaluationsInformationDialogComponent } from '../background-evaluations-information-dialog/background-evaluations-information-dialog.component';

@Component({
  encapsulation: ViewEncapsulation.ShadowDom,
  selector: 'app-add-page-dialog',
  templateUrl: './add-page-dialog.component.html',
  styleUrls: ['./add-page-dialog.component.scss']
})
export class AddPageDialogComponent implements OnInit {
  website: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private monitor: MonitorService, private dialog: MatDialog,) {
  }

  ngOnInit(): void {
    this.website = this.data.website;
  }
  addWebsitePages(data): void {
    this.monitor
      .addWebsitePages(this.website, data.startingUrl, data.urls)
      .subscribe((result) => {
        if (result) {
          this.dialog.open(BackgroundEvaluationsInformationDialogComponent, {
            width: "40vw",
          });
        } else {
          alert("Error");
        }
      });
  }


}
