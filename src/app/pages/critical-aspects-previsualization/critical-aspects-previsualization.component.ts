import { Component, ElementRef, OnInit } from '@angular/core';

import { RESPONSE } from './criterias';

@Component({
  selector: 'app-critical-aspects-previsualization',
  templateUrl: './critical-aspects-previsualization.component.html',
  styleUrls: ['./critical-aspects-previsualization.component.scss']
})
export class CriticalAspectsPrevisualizationComponent implements OnInit {

  website: any = {name: "Portal da Justiça", link: "https://justica.gov.pt/", date: "04 de Agosto, 2023", nrPages: 54, inAccordance: 24, totalAccordance: 24, state: true}
  evaluation = (this.website.inAccordance/this.website.totalAccordance)*100;

  percentageConfig = {
    '70': { color: 'green' },
    '40': { color: 'orange' },
    '0': { color: 'red' }
  };

  criterias: any = RESPONSE.result;
  
  element: ElementRef;

  constructor(private el: ElementRef) { 
    this.element = el;
  }

  ngOnInit(): void {
    
  }

  scrollToSection(id: string) {
    
  }

}
