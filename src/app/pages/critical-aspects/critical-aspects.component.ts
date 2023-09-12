import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Criteria } from 'src/app/models/criteria';
import { CriticalAspectsService } from 'src/app/services/critical-aspects/critical-aspects.service';
import { conformity } from './accordion/accordion.component';

@Component({
  selector: 'app-critical-aspects',
  templateUrl: './critical-aspects.component.html',
  styleUrls: ['./critical-aspects.component.scss']
})
export class CriticalAspectsComponent implements OnInit {

  constructor(private translate: TranslateService, private service: CriticalAspectsService,
    private el: ElementRef, private renderer: Renderer2) { }
  criteriaSize: number = 0;
  criterias: Criteria[] = [];
  conformCriteria:number = 12;
  progressCriteria:number = 12;
  hashMap = new Map<number, conformity>();

  ngOnInit() {
    this.service.getAll().subscribe(data => {
      this.criterias = data;
      for (let index = 0; index < data.length; index++) {
        this.criteriaSize = this.criteriaSize + data[index].subCriteria!.length;
      }
    });
  }
  scrollToSection(id: string) {
    const element = this.el.nativeElement.querySelector(`#${id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  changeConformity(item: conformity) {
    console.log(item);
    this.hashMap.set(item.id,item);
  }
}
