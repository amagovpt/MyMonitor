import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable,} from "rxjs";
import { ConfigService } from "../config.service";
import { conformity } from "src/app/components/checklist/utils/conformity.interface";
@Injectable({
    providedIn: 'root'
})
export class CriticalAspectsService {

    constructor(private readonly http: HttpClient, private readonly config: ConfigService) {
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