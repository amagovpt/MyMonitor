import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

declare var Quill: any;

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],

})
export class EditorComponent implements OnInit, AfterViewInit {
  @Input() content = '';
  @Input() editorId!: string;
  @Input() isPreview = false;
  @Output() changeEvent = new EventEmitter<string>();

  quill: any; // Declare a variable to hold the Quill instance
  
  constructor() { }

  ngOnInit() {
    
  }

  ngAfterViewInit(): void {
  }
  textSave(event:any){
    this.changeEvent.emit(event.html);
  }
}
