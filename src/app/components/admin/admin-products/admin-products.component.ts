import { ProductService } from './../../../services/product.service';
import { Component } from '@angular/core';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss'],
})
export class AdminProductsComponent {
  products$;
  constructor(private ProductService: ProductService) {
    this.products$ = ProductService.getAll();
  }
}
