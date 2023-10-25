import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';
import { Product } from '../../models/product';
import { Component, Input } from '@angular/core';
import { ShoppingCart } from 'src/app/shared/models/shopping-cart';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input('product') product: Product;
  @Input('show-actions') showActions: boolean = true;
  @Input('shopping-cart') shoppingCart: ShoppingCart;
  constructor(private cartService: ShoppingCartService) {}
  addToCart(): void {
    this.cartService.addToCart(this.product);
  }
}
