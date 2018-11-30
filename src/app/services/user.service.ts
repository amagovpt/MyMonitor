import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map, retry, catchError } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import * as _ from 'lodash';

import { ConfigService } from './config.service';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from './message.service';

import { Response } from '../models/response';
import { MmError } from '../models/error';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private message: MessageService,
    private config: ConfigService
  ) { }

  login(email: string, password: string): Observable<boolean> {
    const app = 'monitor';
    return ajax.post(this.config.getServer('/session/login'), {email, password, app}).pipe(
      retry(3),
      map(res => {
        if (!res.response || res.status === 404) {
          throw new MmError(404, 'Service not found', 'SERIOUS');
        }

        const response = new Response(res.response);

        if (response.hasError()) {
          throw new MmError(response.success, response.message);
        }

        const cookie = response.result;
        const host = this.getEnv();
        const tomorrow = new Date();
        tomorrow.setTime(tomorrow.getTime() + 1 * 86400000);

        sessionStorage.setItem('MM-email', email);
        this.cookieService.set('MM-SSID', btoa(cookie), tomorrow, '/', host, false);
        this.router.navigateByUrl('/user');
        return true;
      }),
      catchError((err: MmError) => {
        switch (err.code) {
          case -1: // user doesn't exist
            this.message.show('LOGIN.messages.no_user');
            break;
          case -2: // error, password doesn't match
            this.message.show('LOGIN.messages.password_match');
            break;
          default:
            this.message.show('LOGIN.messages.system_error');
            break;
        }

        console.log(err);
        return of(false);
      })
    );
  }

  isUserLoggedIn(): boolean {
    return this.cookieService.check('MM-SSID');
  }

  getUserData(): {} {
    return atob(this.cookieService.get('MM-SSID'));
  }

  getEmail(): string {
    return sessionStorage.getItem('MM-email');
  }

  logout(location: string = '/'): void {
    const host = this.getEnv();

    sessionStorage.removeItem('MM-email');
    this.cookieService.delete('MM-SSID', '/', this.getEnv());
    this.router.navigateByUrl(location);
  }

  private getEnv(): string {
    return _.split(location.host, ':')[0];
  }
}
