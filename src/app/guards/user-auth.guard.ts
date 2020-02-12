import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { UserService } from '../services/user.service';

import { UserAuthErrorDialogComponent } from '../dialogs/user-auth-error-dialog/user-auth-error-dialog.component';
@Injectable({
  providedIn: 'root'
})
export class UserAuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private user: UserService,
    private dialog: MatDialog
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {

    const login = this.user.isUserLoggedIn();

    if (!login) {
      this.dialog.open(UserAuthErrorDialogComponent);
      this.user.logout();
    }

    return login;
  }
}
