import { Component, OnInit } from '@angular/core';
import { AngularFireObject } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { AppUser } from 'src/app/models/app-user';
import { ShoppingCart } from 'src/app/models/shopping-cart';
import { AuthService } from 'src/app/services/auth.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  cart$: Observable<ShoppingCart>;

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

    this.cart$ = await this.shoppingCartService.getCart();
  }
}
