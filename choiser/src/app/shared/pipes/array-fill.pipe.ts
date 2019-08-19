import {PipeTransform, Pipe} from '@angular/core';

@Pipe({
  name: 'fill'
})
export class FillPipe implements PipeTransform {
  transform(value: number, min?: boolean) {
    if(!min){
      return (new Array(value)).fill(1);
    }
    return (new Array(5 - value)).fill(1);
  }
}