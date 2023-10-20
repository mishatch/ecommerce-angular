import { Component } from '@angular/core';
import { AppUser } from 'src/app/models/app-user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  constructor(private auth: AuthService) {
    auth.appUser$.subscribe((appUser) => (this.appUser = appUser));
  }
  appUser: AppUser;

  logout(): void {
    this.auth.logout();
  }
  log(): void {
    console.log(this.appUser);
  }
}
