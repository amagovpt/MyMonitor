import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
 
  private server: string;

  constructor() {
    const host = location.hostname;

    if (host === 'localhost') {
      this.server = 'http://localhost/api';
    } else {
      this.server = '/api';
    }
  }

  getServer(service: string): string {
    return this.server + service;  }
}