import { Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  PROTOCOL: string;
  PORT: number;
  HOST: string;
  PATH: string;
  URI: string;

  constructor() {
    this.PROTOCOL = location.protocol + '//'; // 'http://';
    this.HOST = _.split(location.host, ':')[0];

    if (this.HOST === 'localhost') {
      this.PORT = 3443;
      this.PATH = '';
    } else {
      if (this.PROTOCOL === 'http://') {
        this.PORT = 80;
      } else {
        this.PORT = 443;
      }

      this.PATH = '/server';
    }

    this.URI = `${this.PROTOCOL}${this.HOST}:${this.PORT}${this.PATH}`;
  }

  getServer(service: string): string {
    return `${this.URI}${service}`;
  }
}
