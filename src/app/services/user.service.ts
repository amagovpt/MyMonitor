import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, retry, catchError } from 'rxjs/operators';

import { ConfigService } from './config.service';
import { MessageService } from './message.service';

import { Response } from '../models/response';
import { MmError } from '../models/error';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private readonly router: Router,
    private readonly http: HttpClient,
    private readonly message: MessageService,
    private readonly config: ConfigService
  ) { }
  
  loginGov(): Observable<Array<any>> {
    window.location.href = this.config.getServer("/auth/login");
    return /*this.http
      .get<any>(this.config.getServer("/auth/login"), {
        observe: "response",
      })
      .pipe(
        retry(3),
        map((res) => {
          const response = <Response>res.body;

          if (!res.body || res.status === 404) {
            throw new MmError(404, "Service not found", "SERIOUS");
          }

          if (response.success !== 1) {
            throw new MmError(response.success, response.message);
          }

          return <Array<any>>response.result;
        }),
        catchError((err) => {
          console.log(err);
          return of(null);
        })
      );*/
  }
  login(username: string, password: string): Observable<boolean> {
    const type = 'monitor';
    return this.http.post<any>(this.config.getServer('/auth/login'), {username, password, type}, {observe: 'response'}).pipe(
      retry(3),
      map(res => {
        if (!res.body || res.status === 404) {
          throw new MmError(404, 'Service not found', 'SERIOUS');
        }

        const response = new Response(res.body);

        if (response.hasError()) {
          throw new MmError(response.success, response.message);
        }

        const cookie = response.result;
        const tomorrow = new Date();
        tomorrow.setTime(tomorrow.getTime() + 1 * 86400000);

        sessionStorage.setItem('MM-username', username);
        localStorage.setItem('MM-SSID', cookie);
        localStorage.setItem('expires-at', tomorrow.toString());

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
    const token = localStorage.getItem('MM-SSID');
    const expires = localStorage.getItem('expires-at');
    return token && new Date() < new Date(expires);
  }

  getUserData(): any {
    return localStorage.getItem('MM-SSID');
  }

  getUsername(): string {
    return sessionStorage.getItem('MM-username');
  }

  logout(location: string = '/'): Observable<boolean> {
    return this.http.post<any>(this.config.getServer('/auth/logout'), {}, {observe: 'response'}).pipe(
      retry(3),
      map(res => {
        if (!res.body || res.status === 404) {
          throw new MmError(404, 'Service not found', 'SERIOUS');
        }

        const response = new Response(res.body);

        if (response.hasError()) {
          throw new MmError(response.success, response.message);
        }

        sessionStorage.removeItem('MM-username');
        localStorage.removeItem('MM-SSID');
        localStorage.removeItem('expires-at');
        this.router.navigateByUrl(location);
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
}
