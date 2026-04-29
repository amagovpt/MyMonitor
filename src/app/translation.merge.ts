import { Observable, forkJoin, from, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';

export class LazyMergeTranslateLoader implements TranslateLoader {
  constructor(private http: HttpClient) {}

  getTranslation(lang: string): Observable<any> {

    const langNormalized = lang.toLowerCase();
    const isEnglish = langNormalized === 'en' || langNormalized === 'english';
    

    const fileName = isEnglish ? 'English' : 'Portuguese';


    const localJson$ = this.http.get(`./assets/i18n/${fileName}.json`).pipe(
      catchError(err => {
        return of({}); 
      })
    );

    const rulesetsJs$ = from(import('@a12e/accessmonitor-rulesets')).pipe(
      map(module => {
        const extraData = module.translations;
        return isEnglish ? extraData.en.translation : extraData.pt.translation;
      }),
      catchError(err => {

        return of({});
      })
    );

    return forkJoin([rulesetsJs$, localJson$]).pipe(
      map(([rulesetData, localData]) => {
        return { ...rulesetData, ...localData };
      })
    );
  }
}