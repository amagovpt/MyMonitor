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


}
