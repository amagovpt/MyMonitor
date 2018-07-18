import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toFixed'
})
export class ToFixedPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return parseFloat(value).toFixed(1);
  }
}
