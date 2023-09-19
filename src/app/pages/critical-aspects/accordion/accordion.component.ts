import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
export interface conformity {
  id:number,
  subCriteriaId: number,
  websiteId: number,
  conformity: number,
  note: string
}
@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss']
})
export class AccordionComponent implements OnInit {
  panelOpenState = false;
  @Input() content = '';
  @Input() selectedValue: string;
  @Input() id: number
  @Input() title: string = "";
  @Input() description: string = "";
  @Input() editorId: string = ""
  @Input() isPreview: boolean = false;
  @Output() conformityEvent = new EventEmitter<conformity>();
  @Output() saveEvent = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }
  changeConformity(value: string) {
    this.conformityEvent.emit({
      id:null,
      subCriteriaId: this.id,
      websiteId: 1,
      conformity: Number.parseInt(this.selectedValue),
      note: value
    });
  }
  save() {
    this.saveEvent.emit();
  }
}
