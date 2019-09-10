import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'closed'
})
export class ClosedPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(value){
      value = value.filter(element =>{
        return element.state == 'closed';
      });
      return value.length;
    }
  }

}
