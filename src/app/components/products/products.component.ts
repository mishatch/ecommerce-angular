import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { CategoryService } from 'src/app/services/category.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {
  products$;
  categories$;
  constructor(
    productService: ProductService,
    categoryService: CategoryService,
    private route: ActivatedRoute
  ) {
    this.products$ = productService.getAll();
    this.categories$ = categoryService.getCategories();
    console.log(this.route.snapshot.queryParamMap.get('category'));
  }
}
