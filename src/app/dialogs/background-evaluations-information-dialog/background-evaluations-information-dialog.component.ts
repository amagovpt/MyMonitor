import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-background-evaluations-information-dialog',
  templateUrl: './background-evaluations-information-dialog.component.html',
  styleUrls: ['./background-evaluations-information-dialog.component.scss']
})
export class BackgroundEvaluationsInformationDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<BackgroundEvaluationsInformationDialogComponent>,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Subscribe to the afterClosed event of the dialog
    this.dialogRef.afterClosed().subscribe(() => {
      // Navigate to the user route when dialog is closed
      this.router.navigate(['/user']);
    });
  }

}
