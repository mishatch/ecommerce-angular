import { CategoryService } from '../../../shared/services/category.service';
import { Component } from '@angular/core';
import { ProductService } from '../../../shared/services/product.service';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductFormValidators } from 'src/app/validations/product-form.validators';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';

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
  id: string;
  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.categories$ = categoryService.getCategories();

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.productService
        .get(this.id)
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
  save(product): void {
    if (this.id) this.productService.update(this.id, product);
    else this.productService.create(product);
    this.router.navigate(['/admin/products']);
  }
  delete(): void {
    if (!confirm('Are you sure you want to delete this product?')) return;
    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
  }
}
