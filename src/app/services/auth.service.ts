import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Injectable } from '@angular/core';
import { Observable, from, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<firebase.User>;
  constructor(private afAuth: AngularFireAuth, private route: ActivatedRoute) {
    this.user$ = this.afAuth.authState;
  }
  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    return from(
      this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    ).pipe(
      switchMap((result) => {
        return of(result);
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }
  logout() {
    return from(this.afAuth.signOut()).pipe(
      switchMap((result) => {
        return of(result);
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }
}
