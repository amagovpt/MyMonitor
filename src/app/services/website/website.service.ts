import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, } from "rxjs";
import { ConfigService } from "../config.service";
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
    getInfoByWebsiteName(name:string): Observable<any> {
        return this.http
            .get<any>(this.config.getServer(`/website/info/byName/${name}`), {
                observe: "response",
            });
    }
}