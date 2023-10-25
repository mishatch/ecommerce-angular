import { Component, OnInit } from '@angular/core';
import { AppUser } from 'src/app/shared/models/app-user';

import { AuthService } from 'src/app/shared/services/auth.service';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  cart$: any;
  appUser: AppUser;

  constructor(
    private auth: AuthService,
    private shoppingCartService: ShoppingCartService
  ) {}

  async ngOnInit() {
    this.auth.appUser$.subscribe((appUser) => (this.appUser = appUser));
    this.cart$ = await this.shoppingCartService.getCart();
  }
  logout(): void {
    this.auth.logout();
  }
}
