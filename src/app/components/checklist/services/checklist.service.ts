import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from 'src/app/services/config.service';
import { ShareCodeDto } from '../utils/share-code.dto';
@Injectable({
  providedIn: 'root'
})
export class ChecklistService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private http: HttpClient, private readonly config: ConfigService) { }

  getAllNotes(checklistId: number, websiteId: number): Observable<any> {
    return this.http.get<any>(this.config.getServer(`/checklists/allNotes/${checklistId}/${websiteId}`), {
      observe: "response",
    });
  }

  validadeSharedCode(websiteName:string,checklistId:number,sharedCode:string): Observable<any> {
    return this.http.get<any>(this.config.getServer(`/checklists/share-code/validate/${websiteName}/${checklistId}/${sharedCode}`), {
      observe: "response",
    });
  }

  saveNotes(body: any): Observable<any> {
    return this.post("/checklists/save-notes", body);
  }

  generateShareCode(shareCode:ShareCodeDto): Observable<any> {
    return this.post("/checklists/share-code/create", shareCode);
  }

  post(path: string, body: any): Observable<any> {
    return this.http.post<any>(this.config.getServer(path), body, this.httpOptions);
  }
}
