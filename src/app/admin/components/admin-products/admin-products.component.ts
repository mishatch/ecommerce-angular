import { ProductService } from '../../../shared/services/product.service';
import { Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss'],
})
export class AdminProductsComponent implements OnDestroy {
  products: any[];
  filteredProducts: any[];
  subscription: any;
  constructor(private ProductService: ProductService) {
    this.subscription = this.ProductService.getAll().subscribe((products) => {
      this.filteredProducts = this.products = products;
    });
  }
  filter(query: string) {
    this.filteredProducts = query
      ? this.products.filter((p) =>
          p.title.toLowerCase().includes(query.toLowerCase())
        )
      : this.products;
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
