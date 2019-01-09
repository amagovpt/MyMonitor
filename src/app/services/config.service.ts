import { Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  PROTOCOL = 'https://';
  PORT = 3443;

  constructor() { }

  getServer(service: string): string {
    const host = _.split(location.host, ':')[0];

    return `${this.PROTOCOL}${host}:${this.PORT}${service}`;
  }
}
