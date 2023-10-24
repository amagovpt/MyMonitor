import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { WebsiteService } from 'src/app/services/website/website.service';
import { WebsiteDTO } from './dto/website.dto';
import { CriticalAspectsService } from 'src/app/services/critical-aspects/critical-aspects.service';
import { take } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-accessibility-declaration',
  templateUrl: './accessibility-declaration.component.html',
  styleUrls: ['./accessibility-declaration.component.scss']
})
export class AccessibilityDeclarationComponent implements OnInit {
  accessibility: any = { evaluation: 10, inAccordance: 0, totalAccordance: 24 }
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

  websiteName: string = '';
  isConform = false;

  example: string[] = ['a','b','c','d','e'];

  constructor(private websiteService: WebsiteService, private criticalAspectsService: CriticalAspectsService,
    private cdr: ChangeDetectorRef, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.websiteName = this.activatedRoute.snapshot.paramMap.get('websiteName');
    
    this.websiteService.getInfoByWebsiteName(this.websiteName).pipe(take(1))
      .subscribe(data => {
        this.wsDto = data.body.result;
        this.countConformDeclaration(data.body.result.id);
      });

    

  }
  countConformDeclaration(id:number){
    this.criticalAspectsService.countConformDeclaration(id).pipe(take(1))
    .subscribe(data => {
      this.accessibility.inAccordance = data.body.result;
      this.percentage = Math.round(data.body.result / this.accessibility.totalAccordance * 100);
      this.cdr.detectChanges();
    });
  }
  
}
