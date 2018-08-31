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

  private getServer(service: string): string {
    const host = location.host;

    return 'http://' + _.split(host, ':')[0] + ':3000' + service;
  }
}