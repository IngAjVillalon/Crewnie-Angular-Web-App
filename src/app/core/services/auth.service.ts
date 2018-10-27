import { ActiveUser } from './../models/models';
import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import { auth } from 'firebase/app';
import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestoreModule, AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorageModule, AngularFireStorage } from '@angular/fire/storage';

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/switchMap";
import "rxjs/add/observable/of";
import * as firebase from "firebase/app";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authState: any = null;
  user$: Observable<firebase.User>;

  constructor(
    public afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.afAuth.authState.subscribe((auth) => {
      this.authState = auth
    });
   }


   get isUserAnonymousLoggedIn(): boolean {
    return (this.authState !== null) ? this.authState.isAnonymous : false
  }

  public currentUserId(): string {
    console.log(this.authState);
    return (this.authState !== null) ? this.authState.uid : ''
  }

  public currentUserName(): string {
    return this.authState['email']
  }

  public currentUser(): any {
    return (this.authState !== null) ? this.authState : null;
  }

  get isUserEmailLoggedIn(): boolean {
    if ((this.authState !== null) && (!this.isUserAnonymousLoggedIn)) {
      return true
    } else {
      return false
    }
  }

   public signUpWithEmail(email, password)  {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
    .then((user) => {
      this.authState = user
    })
    .catch(error => {
      console.log(error)
      throw error
    });
   }

   public signUpWithGmail()  {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.afAuth.auth.signInWithPopup(provider).then((user) => {
      this.authState = user
      this.updateUserData(user.user);
    })
    .catch(error => {
      console.log(error)
      throw error
    });
   }

   public signUpWithFb()  {
    const provider = new firebase.auth.FacebookAuthProvider();
    return this.afAuth.auth.signInWithPopup(provider).then((user) => {
      this.authState = user
    })
    .catch(error => {
      console.log(error)
      throw error
    });
   }

   public resendVarificationCode(email) {
   }

   public signInWithEmail(email, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
    .then((user) => {
      this.authState = user
    })
    .catch(error => {
      console.log(error)
      throw error
    });
   }

   signOut(): void {
    this.afAuth.auth.signOut();
    this.router.navigate(['/'])
  }

  public resetPassword(email) {

  }

  public updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );

    const data: ActiveUser = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      providerId: user.providerId,
      isAdmin: false
    };

    return userRef.set(data, { merge: true });
  }

  getUser(uid: string) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${uid}`);
    return userRef;
  }
}
