import { Product } from './product';
import { ShoppingCartItem } from './shopping-cart-item';

export class ShoppingCart {
  items: ShoppingCartItem[] = [];
  constructor(
    public itemsMap: { [$key: string]: ShoppingCartItem } | ShoppingCartItem[]
  ) {
    this.itemsMap = itemsMap || {};
    for (let productId in itemsMap) {
      let item = itemsMap[productId];
      let x = new ShoppingCartItem();
      Object.assign(x, item);
      x.$key = productId;
      this.items.push(x);
    }
  }
  getQuantity(product: Product) {
    let item = this.itemsMap[product.$key];
    console.log('item:', item);

    return item ? item.quantity : 0;
  }

  get totalPrice() {
    let sum = 0;
    for (let productId in this.items) {
      sum += this.items[productId].totalPrice;
    }
    return sum;
  }

  get totalItemsCount() {
    let count = 0;
    for (let productId in this.items) count += this.items[productId].quantity;
    return count;
  }
}
