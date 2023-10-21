import { CategoryService } from './../../../services/category.service';
import { Component } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { tap } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductFormValidators } from 'src/app/validations/product-form.validators';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { AppProduct } from '../../../models/app-product';
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent {
  categories$;
  product: any = {
    title: '',
    price: '',
    category: '',
    imageUrl: '',
  };
  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.categories$ = categoryService.getCategories();

    let id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService
        .get(id)
        .pipe(take(1))
        .subscribe((p) => (this.product = p));
    }
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
