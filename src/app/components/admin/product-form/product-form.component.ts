import { CategoryService } from './../../../services/category.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent {
  categories$;
  constructor(categoryService: CategoryService) {
    this.categories$ = categoryService.getCategories();
  }
}
