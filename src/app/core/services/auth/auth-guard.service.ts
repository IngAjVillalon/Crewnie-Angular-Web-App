import { Injectable } from '@angular/core';

import {
  CanActivate, CanLoad,
  Route, ActivatedRouteSnapshot, RouterStateSnapshot
} from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

// Auth Service
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanLoad, CanActivate {

  constructor(
    private acAuth: AuthService  // Angular Crewnie Authentication
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {

    let url: string = state.url;

    return this.checkLogin(url);
  }

  canLoad(route: Route): Observable<boolean> | boolean {

    let url = `/${route.path}`;

    return this.checkLogin(url);
  }

  checkLogin(url: string): Observable<boolean> | boolean {
    if (this.acAuth.authenticated) { return true; }

    return this.acAuth.afAuth.authState
      .take(1)
      .map(user => !!user)
      .do(loggedIn => {
        if (!loggedIn) {
          this.acAuth.redirectUrl = url;
          this.acAuth.router.navigate(['/sessions/signin']);
        }
      })
  }

}
