import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from 'src/app/services/config.service';

@Injectable({
  providedIn: 'root'
})
export class ChecklistService {

  constructor(private http: HttpClient, private readonly config: ConfigService) { }

  getAllNotes(checklistId: number, websiteId: number): Observable<any> {
    return this.http.get<any>(this.config.getServer(`/critical-aspects/allNotes/${checklistId}/${websiteId}`), {
      observe: "response",
    });
  }

  saveNotes(body: any): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>(this.config.getServer("/critical-aspects/save-notes"), body, httpOptions);
  }


}
