import {ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { WebsiteService } from 'src/app/services/website/website.service';
import { WebsiteDTO } from './dto/website.dto';
import { CriticalAspectsService } from 'src/app/services/critical-aspects/critical-aspects.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-accessibility-declaration',
  templateUrl: './accessibility-declaration.component.html',
  styleUrls: ['./accessibility-declaration.component.scss']
})
export class AccessibilityDeclarationComponent implements OnInit{

  accessibility: any = { website: "Portal da Justiça", date: "2023-09-14 14:02:17", nrPages: 54, evaluation: 10, inAccordance: 0, totalAccordance: 24, state: false }
  wsDto: WebsiteDTO = new WebsiteDTO();
  percentage: number = 0;
  thresholdConfig = {
    '7': { color: 'green' },
    '4': { color: 'orange' },
    '0': { color: 'red' }
  };

  percentageConfig = {
    '70': { color: 'green' },
    '40': { color: 'orange' },
    '0': { color: 'red' }
  };

  constructor(private websiteService: WebsiteService, private criticalAspectsService: CriticalAspectsService,
    private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.websiteService.getInfoByWebsiteId(1).pipe(take(1)).subscribe(data => {this.wsDto = data.body.result;});
    this.criticalAspectsService.countConformDeclaration(1).pipe(take(1)).subscribe(data => {
      this.accessibility.inAccordance = data.body.result;
      this.percentage = Math.round(data.body.result / this.accessibility.totalAccordance * 100);
      this.cdr.detectChanges();
    });
  }

}
