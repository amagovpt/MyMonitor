import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'html'
})
export class HtmlPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) { }

  transform(value: any, args?: any): any {
    if (args) {
      value = value.replace(/</g, '&#60;').replace(/>/g, '&#62;');
      return value;
    } else {
      return this.sanitizer.bypassSecurityTrustHtml(value);
    }
  }

}
