import { CategoryService } from './../../../services/category.service';
import { Component } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { tap } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductFormValidators } from 'src/app/validations/product-form.validators';
import { Router } from '@angular/router';
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent {
  categories$;
  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router
  ) {
    this.categories$ = categoryService
      .getCategories()
      .pipe(tap((d) => console.log(d)));
  }
  productForm = new FormGroup({
    title: new FormControl('', Validators.required),
    price: new FormControl('', [
      Validators.required,
      ProductFormValidators.priceValidator,
    ]),
    category: new FormControl('', Validators.required),
    imageUrl: new FormControl('', [
      Validators.required,
      ProductFormValidators.urlValidator,
    ]),
  });
  save(product) {
    this.productService.create(product);
    this.router.navigate(['/admin/products']);
  }
}
