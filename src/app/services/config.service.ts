import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() { }

  getServer(service: string): string {
    return '/api' + service;
  }
}
