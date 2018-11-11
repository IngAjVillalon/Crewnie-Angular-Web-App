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
  userID: String;
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
      // if(user) {
      //   this.user = user;
      //   console.log(user.uid);
      //   console.log("got User");
      //   return this.afs.doc<ActiveUser>('users/${user.uid}').valueChanges();
      // }
    });
  }

  public getUserProfile(userId: string) {
    this.currentUser$ = this.db.doc<ActiveUser>("users/" + userId);
    this.currentUser$.valueChanges().subscribe(user => {
      this.currentUser = user;
      return  this.currentUser;
    });
  }
}
