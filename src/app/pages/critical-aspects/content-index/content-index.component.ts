import { Component, ElementRef, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-content-index',
  templateUrl: './content-index.component.html',
  styleUrls: ['./content-index.component.scss']
})
export class ContentIndexComponent implements OnInit {

  @Input() el: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  scrollToSection(id: string) {    
    const element = this.el.nativeElement.querySelector(`#${id}`);    
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

}
