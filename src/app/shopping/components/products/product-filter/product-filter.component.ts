import { CategoryService } from '../../../../shared/services/category.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss'],
})
export class ProductFilterComponent {
  @Input('category') category;
  constructor(categoryService: CategoryService) {
    this.categories$ = categoryService.getCategories();
  }
  categories$;
}
