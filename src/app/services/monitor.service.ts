import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map, retry, catchError } from 'rxjs/operators';
import * as _ from 'lodash';

import { UserService } from './user.service';
import { MessageService } from './message.service';

import { Response } from '../models/response';
import { Page } from '../models/page';
import { MmError } from '../models/error';

@Injectable({
  providedIn: 'root'
})
export class MonitorService {

  constructor(
    private user: UserService,
    private message: MessageService
  ) { }

  getUserWebsites(): Observable<Array<any>> {
    return ajax.post(this.getServer('/monitor/user/websites'), {cookie: this.user.getUserData()}).pipe(
      retry(3),
      map(res => {
        const response = <Response> res.response;

        if (!res.response || res.status === 404) {
          throw new MmError(404, 'Service not found', 'SERIOUS');
        }

        if (response.success !== 1) {
          throw new MmError(response.success, response.message);
        }

        return <Array<any>> response.result;
      }),
      catchError(err => {
        console.log(err);
        return of(null);
      })
    );
  }

  getUserWebsitePages(website: string): Observable<Array<any>> {
    return ajax.post(this.getServer('/monitor/user/website/pages'), {website, cookie: this.user.getUserData()}).pipe(
      retry(3),
      map(res => {
        const response = <Response> res.response;

        if (!res.response || res.status === 404) {
          throw new MmError(404, 'Service not found', 'SERIOUS');
        }

        if (response.success !== 1) {
          throw new MmError(response.success, response.message);
        }

        return <Array<any>> response.result;
      }),
      catchError(err => {
        console.log(err);
        return of(null);
      })
    );
  }

  getWebsiteDomain(website: string): Observable<string> {
    return ajax.post(this.getServer('/monitor/user/website/domain'), {website, cookie: this.user.getUserData()}).pipe(
      retry(3),
      map(res => {
        const response = <Response> res.response;

        if (!res.response || res.status === 404) {
          throw new MmError(404, 'Service not found', 'SERIOUS');
        }

        if (response.success !== 1) {
          throw new MmError(response.success, response.message);
        }

        return <string> response.result;
      }),
      catchError(err => {
        console.log(err);
        if (err.code === -17) {
          this.message.show('MISC.unexpected_error');
        }
        return of(null);
      })
    );
  }

  addWebsitePages(website: string, domain: string, pages: Array<string>): Observable<Array<Page>> {
    return ajax.post(this.getServer('/monitor/user/website/addPages'), {website, domain, pages: JSON.stringify(pages), cookie: this.user.getUserData()}).pipe(
      retry(3),
      map(res => {
        const response = <Response> res.response;

        if (!res.response || res.status === 404) {
          throw new MmError(404, 'Service not found', 'SERIOUS');
        }

        if (response.success !== 1) {
          throw new MmError(response.success, response.message);
        }

        return <Array<Page>> response.result;
      }),
      catchError(err => {
        console.log(err);
        if (err.code === -17) {
          this.message.show('MISC.unexpected_error');
        } else {
          this.message.show('ADD_PAGES.error_message');
        }
        return of(null);
      })
    );
  }

  private getServer(service: string): string {
    const host = location.host;

    return 'https://' + _.split(host, ':')[0] + ':3001' + service;
  }
}
