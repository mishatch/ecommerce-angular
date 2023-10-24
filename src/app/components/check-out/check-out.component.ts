import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ShoppingCart } from 'src/app/models/shopping-cart';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss'],
})
export class CheckOutComponent implements OnInit, OnDestroy {
  shippingForm: FormGroup;
  cart: ShoppingCart;
  cartSubscription: Subscription;
  userId: string;
  userSubscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private shoppingCartService: ShoppingCartService,
    private orderService: OrderService,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    this.shippingForm = this.fb.group({
      name: ['', Validators.required],
      addressLine1: ['', Validators.required],
      addressLine2: ['', Validators.required],
      city: ['', Validators.required],
    });

    let cart$ = await this.shoppingCartService.getCart();
    this.cartSubscription = cart$.subscribe((cart) => {
      this.cart = cart;
    });
    this.authService.user$.subscribe((user) => {
      this.userId = user.uid;
    });
  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  placeOrder() {
    if (this.shippingForm.valid) {
      let order = {
        userId: this.userId,
        datePlaced: new Date().getTime(),
        shipping: this.shippingForm.value,
        items: this.cart.items.map((i) => {
          return {
            product: {
              title: i.title,
              imageUrl: i.imageUrl,
              price: i.price,
            },
            quantity: i.quantity,
            totalPrice: i.totalPrice,
          };
        }),
      };

      this.orderService.storeOrder(order);
    }
  }
}
