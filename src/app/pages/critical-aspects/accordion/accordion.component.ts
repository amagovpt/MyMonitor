import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
export interface conformity {
    id: number,
  conformity: string,
  text: string
}
@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss']
})
export class AccordionComponent implements OnInit {
  panelOpenState = false;
  selectedValue: string;
  @Input() id: number
  @Input() title: string = "";
  @Input() description: string = "";
  @Output() conformityEvent = new EventEmitter<conformity>();

  constructor() { }

  ngOnInit() {
  }
  changeConformity(value: string) {
    this.conformityEvent.emit({
      id: this.id,
      conformity: this.selectedValue,
      text: value
    });
  }

}
