import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import { ActivatedRoute } from '@angular/router';
import { conformity } from '../utils/conformity.interface';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss']
})
export class AccordionComponent implements OnInit {
  @ViewChild(MatExpansionPanel) componenteFilho: MatExpansionPanel;
  @Input() panelOpenState = false;
  @Input() content:string = '';
  @Input() selectedValue: string;
  @Input() id: number;
  @Input() title: string = "";
  @Input() description: string = "";
  @Input() editorId: string = ""
  @Input() isPreview: boolean = false;
  @Output() conformityEvent = new EventEmitter<conformity>();
  @Output() saveEvent = new EventEmitter<void>();
  constructor(
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  }
  changeConformity(value: string) {
    this.conformityEvent.emit({
      id: null,
      subCriteriaId: this.id,
      checklistId:null,
      websiteId: Number.parseInt(this.activatedRoute.snapshot.paramMap.get('id')),
      conformity: Number.parseInt(this.selectedValue),
      note: value
    });
  }
  save() {
    this.saveEvent.emit();
  }
  open(){
    this.componenteFilho.open();
  }
  close(){
    this.componenteFilho.close();
  }
}
