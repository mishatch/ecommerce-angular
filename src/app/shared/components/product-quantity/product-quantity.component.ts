import { Component, Input } from '@angular/core';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';
import { Product } from '../../models/product';
import { ShoppingCart } from '../../models/shopping-cart';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.scss'],
})
export class ProductQuantityComponent {
  @Input('product') product: Product;

  @Input('shopping-cart') shoppingCart: ShoppingCart;
  constructor(private cartService: ShoppingCartService) {}
  addToCart(): void {
    this.cartService.addToCart(this.product);
  }
  removeFromCart(): void {
    this.cartService.removeFromCart(this.product);
  }
}
