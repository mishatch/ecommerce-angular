import { Component, OnInit } from '@angular/core';
import { AppUser } from 'src/app/models/app-user';
import { AuthService } from 'src/app/services/auth.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  shoppingCartItemCount: number;
  constructor(
    private auth: AuthService,
    private shoppingCartService: ShoppingCartService
  ) {}
  appUser: AppUser;

  logout(): void {
    this.auth.logout();
  }
  log(): void {
    console.log(this.appUser);
  }
  async ngOnInit() {
    this.auth.appUser$.subscribe((appUser) => (this.appUser = appUser));
    let cart$ = await this.shoppingCartService.getCart();
    cart$.valueChanges().subscribe((cart) => {
      this.shoppingCartItemCount = 0;
      for (let productId in cart.items)
        this.shoppingCartItemCount += cart.items[productId].quantity;
    });
  }
}
