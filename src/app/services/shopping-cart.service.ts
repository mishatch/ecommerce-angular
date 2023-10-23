import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { Product } from '../models/product';
import { take, map } from 'rxjs/operators';
import { ShoppingCart } from '../models/shopping-cart';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  constructor(private db: AngularFireDatabase) {}

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime(),
    });
  }
  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db
      .object<ShoppingCart>('/shopping-carts/' + cartId)
      .valueChanges()
      .pipe(
        map((x) => {
          return new ShoppingCart(x.items);
        })
      );
  }
  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }
  async addToCart(product: Product) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.key);
    item$
      .valueChanges()
      .pipe(take(1))
      .subscribe((item: any) => {
        if (item) item$.update({ quantity: item.quantity + 1 });
        else
          item$.set({
            product: product,
            quantity: 1,
          });
      });
  }
  async removeFromCart(product: Product) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.key);
    item$
      .valueChanges()
      .pipe(take(1))
      .subscribe((item: any) => {
        if (item) item$.update({ quantity: item.quantity - 1 });
        else
          item$.set({
            product: product,
            quantity: 1,
          });
      });
  }
  private async updateItemQuantity(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.key);
    item$
      .valueChanges()
      .pipe(take(1))
      .subscribe((item: any) => {
        if (item) item$.update({ quantity: item.quantity + change });
      });
  }
}
