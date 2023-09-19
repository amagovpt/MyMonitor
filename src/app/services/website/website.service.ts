import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, } from "rxjs";
import { MmError } from "src/app/models/error";
import { ConfigService } from "../config.service";
import { Response } from "../../models/response";
import { Criteria } from "src/app/models/criteria";
import { conformity } from "src/app/pages/critical-aspects/accordion/accordion.component";
@Injectable({
    providedIn: 'root'
})
export class WebsiteService {

    constructor(private readonly http: HttpClient, private readonly config: ConfigService) {
    }
    getInfoByWebsiteId(id:number): Observable<any> {
        return this.http
            .get<any>(this.config.getServer(`/website/info/${id}`), {
                observe: "response",
            });
    }
}