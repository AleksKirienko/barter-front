import { Pipe, PipeTransform } from '@angular/core';
import { Products } from '../../core/models/products';
import { Status } from '../../core/models/status';

@Pipe({
  name: 'filterStatus'
})
export class FilterStatusPipe implements PipeTransform {

  transform(list: Products[], status: Status): Products[] {
    if (!list) {
      return null;
    }
    if (!status || status === 'all') {
      return list;
    }
    return list.filter((item: Products): boolean => item.category.toLocaleLowerCase() === status);
  }

}
