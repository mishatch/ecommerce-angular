import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private db: AngularFireDatabase) {}
  create(product) {
    const newProductRef = this.db.list('/products').push(product);
    const newProductKey = newProductRef.key;
    newProductRef.update({ key: newProductKey });
  }
  getAll() {
    return this.db.list('/products').valueChanges();
  }
  get(productId) {
    return this.db.object('/products/' + productId).valueChanges();
  }
}
