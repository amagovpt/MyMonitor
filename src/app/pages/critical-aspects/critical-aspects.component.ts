import { ChangeDetectorRef, Component, ElementRef, OnInit } from '@angular/core';
import { Criteria } from 'src/app/models/criteria';
import { CriticalAspectsService } from 'src/app/services/critical-aspects/critical-aspects.service';
import { conformity } from './accordion/accordion.component';
import { take } from 'rxjs/operators';
import { WebsiteService } from 'src/app/services/website/website.service';
import { WebsiteDTO } from '../accessibility-declaration/dto/website.dto';
import { ActivatedRoute, Router } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import localePT from '@angular/common/locales/pt';
registerLocaleData(localePT);
const round = (value: number): number => {
  return Math.round(100 * value) / 100; 
};
@Component({
  selector: 'app-critical-aspects',
  templateUrl: './critical-aspects.component.html',
  styleUrls: ['./critical-aspects.component.scss']
})
export class CriticalAspectsComponent implements OnInit {
  element: ElementRef;
  wsDto: WebsiteDTO = new WebsiteDTO();
  criteriaSize: number = 0;
  conformCriteria: number = 0;
  progressCriteria: number = 0;
  conformityPercentage: number;
  criterias: Criteria[] = [];
  hashMap = new Map<number, conformity>();
  isPreview: boolean = false;
  percentageConfig = {
    '70': { color: 'green' },
    '40': { color: 'orange' },
    '0': { color: 'red' }
  };
  websiteId:number = 0;
  constructor(private service: CriticalAspectsService,
    private el: ElementRef, private cdr: ChangeDetectorRef,
    private websiteService: WebsiteService, private router: Router, 
    private activatedRoute: ActivatedRoute) {
    this.element = el;
  }


  ngOnInit() {
    const id : number = Number.parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    this.websiteId = id;
    this.websiteService.getInfoByWebsiteId(id).pipe(take(1)).subscribe(data => {
      this.wsDto = data.body.result;
      this.cdr.detectChanges();
    });
    this.service.getAll().pipe(take(1)).subscribe(data => {
      this.criterias = data.body.result.criteria;
      this.fillHashMap(data.body.result.notes);
      this.fillConformity();
      this.fillCriteriaData(data.body.result.criteria);
      this.cdr.detectChanges();
    });

  }

  fillHashMap(conformity: conformity[]) {
    for (let index = 0; index < conformity.length; index++) {
      this.hashMap.set(conformity[index].subCriteriaId, conformity[index]);
    }
  }

  fillCriteriaData(criterias: Criteria[]) {
    this.criteriaSize = 0;
    for (let index = 0; index < criterias.length; index++) {
      this.criteriaSize = this.criteriaSize! + criterias[index].subCriteria!.length;
      this.conformityPercentage = round(round(this.conformCriteria / this.criteriaSize) * 100);
    }
  }

  scrollToSection(id: string) {
    const element = this.el.nativeElement.querySelector(`#${id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  fillConformity() {
    this.conformCriteria = 0;
    this.hashMap.forEach(i => {
      if (i.conformity === 1 || i.conformity === 2) {
        this.conformCriteria = this.conformCriteria + 1;
      }
    })
    this.progressCriteria = this.hashMap.size;
    this.conformityPercentage = round(round(this.conformCriteria / this.criteriaSize) * 100);
  }

  changeConformity(item: conformity) {
    this.conformCriteria = 0;
    if (this.hashMap.has(item.subCriteriaId)) {
      item.id = this.hashMap.get(item.subCriteriaId).id

    }
    this.hashMap.set(item.subCriteriaId, item);
    this.hashMap.forEach(i => {
      if (i.conformity === 1 || i.conformity === 2) {
        this.conformCriteria = this.conformCriteria + 1;

      }
    })
    this.progressCriteria = this.hashMap.size;
    this.conformityPercentage = round(round(this.conformCriteria / this.criteriaSize) * 100);
  }

  save() {
    this.service.save(this.hashMap).pipe(take(1)).subscribe(() => {
      this.service.getAll().pipe(take(1)).subscribe(data => {
        this.criterias = data.body.result.criteria;
        this.fillHashMap(data.body.result.notes);
        this.fillConformity();
        this.fillCriteriaData(data.body.result.criteria);
        this.cdr.detectChanges();
      });
    });

  }

  saveAndExit() {
    this.service.save(this.hashMap).pipe(take(1)).subscribe(() => this.router.navigateByUrl("/acessibility-declaration/1"));
  }

  clean() {
    this.hashMap.clear();
  }

}