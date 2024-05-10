import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { CriticalAspectsService } from 'src/app/services/critical-aspects/critical-aspects.service';
import { WebsiteService } from 'src/app/services/website/website.service';

@Component({
  selector: 'app-stamp-application',
  templateUrl: './stamp-application.component.html',
  styleUrls: ['./stamp-application.component.scss']
})
export class StampApplicationComponent implements OnInit {
  websiteId: number;

  accessibility: any = { evaluation: 10, inAccordance: 24, totalAccordance: 24, state: true }
  wsDto: any = { Name: "Portal da Justiça", Declaration_Update_Date: "2023-09-14 14:02:17", Pages: 54, WebsiteId: 1 };
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

  hasContent: boolean = false;
  hasTransaction: boolean = false;
  hasUserTests: boolean = false;

  showStamp: boolean = false;

  constructor(private websiteService: WebsiteService, private criticalAspectsService: CriticalAspectsService,
    private cdr: ChangeDetectorRef, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.websiteId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.percentage = (this.accessibility.inAccordance / this.accessibility.totalAccordance) * 100;
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

  setBoolean(op: number) {
    switch (op) {
      case 1:
        this.hasContent = !this.hasContent;
        break;
      case 2:
        this.hasTransaction = !this.hasTransaction;
        break;
      case 3:
        this.hasUserTests = !this.hasUserTests;
        break;
    }
  }

  submit() {
    this.showStamp = !this.showStamp;
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

}
