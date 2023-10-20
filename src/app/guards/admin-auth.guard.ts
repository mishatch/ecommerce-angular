import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { Observable, of } from 'rxjs';
import { switchMap, map, catchError, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router,
    private userService: UserService
  ) {}

  canActivate(): Observable<boolean> {
    return this.auth.user$.pipe(
      take(1),
      switchMap((user) => {
        if (user) {
          return this.userService.get(user.uid).pipe(
            map((userData) => {
              if (userData && userData.isAdmin) {
                return true;
              } else {
                this.router.navigate(['/']);
                return false;
              }
            }),
            catchError(() => {
              this.router.navigate(['/']);
              return of(false);
            })
          );
        } else {
          this.router.navigate(['/login']);
          return of(false);
        }
      })
    );
  }
}
