import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  user: firebase.User;
  constructor(private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe((user) => {
      this.user = user;
    });
  }

  async logout() {
    try {
      const result = await this.afAuth.signOut();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
}
