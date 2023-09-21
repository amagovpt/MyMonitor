import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { CriticalAspectsService } from 'src/app/services/critical-aspects/critical-aspects.service';
import { WebsiteService } from 'src/app/services/website/website.service';

@Component({
  selector: 'app-stamp-application',
  templateUrl: './stamp-application.component.html',
  styleUrls: ['./stamp-application.component.scss']
})
export class StampApplicationComponent implements OnInit {

  accessibility: any = { evaluation: 10, inAccordance: 24, totalAccordance: 24, state: true }
  wsDto: any = { Name: "Portal da Justiça", Declaration_Update_Date: "2023-09-14 14:02:17", Pages: 54, WebsiteId: 1};
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

  selectedRank: number = 0;

  constructor(private websiteService: WebsiteService, private criticalAspectsService: CriticalAspectsService,
    private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.percentage = (this.accessibility.inAccordance/this.accessibility.totalAccordance) * 100;
  }

  callBE() {
    this.websiteService.getInfoByWebsiteId(1).pipe(take(1))
    .subscribe(data => {
      this.wsDto = data.body.result;
      this.cdr.detectChanges();
    });

    this.criticalAspectsService.countConformDeclaration(1).pipe(take(1))
    .subscribe(data => {
      this.accessibility.inAccordance = data.body.result;
      this.percentage = Math.round(data.body.result / this.accessibility.totalAccordance * 100);
      this.cdr.detectChanges();
    });  
  }

}
