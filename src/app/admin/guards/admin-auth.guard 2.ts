import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserService } from '../../shared/services/user.service';
import { map, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { UserData } from '../shared/models/user-data.interface';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthGuard implements CanActivate {
  constructor(
    private afAuth: AngularFireAuth,
    private userService: UserService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.userService.getUser(user.uid).pipe(
            map((userData: UserData) => {
              if (userData && userData.isAdmin) {
                return true;
              } else {
                this.router.navigate(['/login']);
                return false;
              }
            })
          );
        } else {
          this.router.navigate(['/login']);
          return of(false);
        }
      })
    ) as Observable<boolean>;
  }
}
