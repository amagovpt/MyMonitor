import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JsonDataService {
  constructor(private http: HttpClient) {}

  getJsonData(path: string): Observable<any> {
    return this.http.get<any>(path);
  }
}
