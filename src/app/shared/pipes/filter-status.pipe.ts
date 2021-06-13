import { Pipe, PipeTransform } from '@angular/core';
import { Products } from '../../core/models/products';
import { Category } from '../../core/models/category';

@Pipe({
  name: 'filterStatus'
})
export class FilterStatusPipe implements PipeTransform {
  transform(list: Products[], category: Category): Products[] {
    if (!list) {
      return null;
    }
    if (!category || category === 'all') {
      return list;
    }
    return list.filter((item: Products): boolean => item.category.toLocaleLowerCase() === category);
  }
}
