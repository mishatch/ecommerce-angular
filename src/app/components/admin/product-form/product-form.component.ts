import { CategoryService } from './../../../services/category.service';
import { Component } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { tap } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent {
  categories$;
  constructor(
    categoryService: CategoryService,
    private productService: ProductService
  ) {
    this.categories$ = categoryService
      .getCategories()
      .pipe(tap((d) => console.log(d)));
  }
  productForm = new FormGroup({
    title: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    imageUrl: new FormControl('', Validators.required),
  });
  save(product) {
    console.log(product);

    this.productService.create(product);
  }
}
