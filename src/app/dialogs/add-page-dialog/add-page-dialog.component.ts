import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MonitorService } from 'src/app/services/monitor.service';
import { BackgroundEvaluationsInformationDialogComponent } from '../background-evaluations-information-dialog/background-evaluations-information-dialog.component';

@Component({
  selector: 'app-add-page-dialog',
  templateUrl: './add-page-dialog.component.html',
  styleUrls: ['./add-page-dialog.component.scss']
})
export class AddPageDialogComponent implements OnInit {
  website: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private monitor: MonitorService, private dialog: MatDialog,) {
    console.log(this.data);
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
