import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { UserService } from '../services/user.service';

import { UserAuthErrorDialogComponent } from '../dialogs/user-auth-error-dialog/user-auth-error-dialog.component';
import { ChecklistService } from '../components/checklist/services/checklist.service';
import { checklists } from '../components/checklist/checklist.component';
@Injectable({
  providedIn: 'root'
})
export class SharedCodeAuthGuard implements CanActivate {

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private service: ChecklistService,
    private dialog: MatDialog,
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    let checklistName = this.activatedRoute.snapshot.paramMap.get('checklistName');
    let websiteName = this.activatedRoute.snapshot.paramMap.get('websiteName');
    let sharedCode = this.activatedRoute.snapshot.paramMap.get('shareCode');
    const success = this.service.validadeSharedCode(websiteName,checklists.get(checklistName).id,sharedCode);

    if (!success) {
      this.dialog.open(UserAuthErrorDialogComponent);
    }

    return success;
  }
}
