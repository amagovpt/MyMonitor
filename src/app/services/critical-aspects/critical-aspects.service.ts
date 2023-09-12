import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, map, of, retry } from "rxjs";
import { MmError } from "src/app/models/error";
import { ConfigService } from "../config.service";
import { Response } from "../../models/response";
import { Criteria } from "src/app/models/criteria";
@Injectable({
    providedIn: 'root'
})
export class CriticalAspectsService {

    constructor(private readonly http: HttpClient,private readonly config: ConfigService) {
    }
    getAll(): Observable<any> {
        return this.http
            .get<any>(this.config.getServer("/critical-aspects/all"), {
                observe: "response",
              })
              .pipe(
                retry(3),
                map((res) => {
                  const response = <Response>res.body;
                  
                  if (!res.body || res.status === 404) {
                    throw new MmError(404, "Service not found", "SERIOUS");
                  }
        
                  if (response.success !== 1) {
                    throw new MmError(response.success, response.message);
                  }
                  return <Array<Criteria>>response.result;
                }),
                catchError((err) => {
                  console.log(err);
                  return of(null);
                })
              );
          }
}