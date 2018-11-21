import { AuthService } from "./auth.service";
import { Router, ActivatedRoute } from "@angular/router";
import {
  AngularFirestore,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import { AngularFireAuth } from "@angular/fire/auth";
import { Injectable } from "@angular/core";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/switchMap";
import "rxjs/add/observable/of";
import { ActiveUser } from "../models/models";
import { User } from "firebase";
import { promise } from "protractor";

@Injectable({
  providedIn: "root"
})
export class UserService {
  userID: string;
  user$: any;

  currentUser$: AngularFirestoreDocument<ActiveUser>;
  currentUser: ActiveUser;
  user: ActiveUser;

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    this.user$ = this.afAuth.authState.subscribe(user => {
      if(user) {
        this.user = user;
        this.userID = user.uid;
      }
    });
  }

  public getUserId() {
    return localStorage.getItem('userId');;
  }

  public setUserId(userId: string) {
    localStorage.setItem('userId', userId);
  }
}
