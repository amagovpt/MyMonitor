import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, } from "rxjs";
import { MmError } from "src/app/models/error";
import { ConfigService } from "../config.service";
import { Response } from "../../models/response";
import { Criteria } from "src/app/models/criteria";
import { conformity } from "src/app/components/checklist/accordion/accordion.component";
@Injectable({
    providedIn: 'root'
})
export class CriticalAspectsService {

    constructor(private readonly http: HttpClient, private readonly config: ConfigService) {
    }
    getAll(): Observable<any> {
        return this.http
            .get<any>(this.config.getServer("/critical-aspects/all"), {
                observe: "response",
            });
    }
    save(notes: Map<number, conformity>): Observable<any> {
        let body = JSON.stringify(Object.fromEntries(notes));
        let httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        return this.http.post<any>(this.config.getServer("/critical-aspects/save-notes"), body, httpOptions);
    }
    countConformDeclaration(id:number): Observable<any> {
        return this.http
            .get<any>(this.config.getServer(`/critical-aspects/count-conform-notes/${id}`), {
                observe: "response",
            });
    }
}