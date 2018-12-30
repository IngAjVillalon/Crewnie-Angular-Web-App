import { ActiveUser } from '../../models/models';
import { Injectable } from '@angular/core';
import { Router } from "@angular/router";

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { ToastrService } from 'ngx-toastr';

import { Observable, throwError } from 'rxjs';

import "rxjs/add/operator/switchMap";
import "rxjs/add/observable/of";
import * as firebase from "firebase/app";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authState: any = null;
  user$: Observable<firebase.User>;

  public redirectUrl: string;

  constructor(
    public afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    public router: Router,
    private toastr: ToastrService
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

  public async signUpWithEmail(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  public async signUpWithGmail() {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      await this.afAuth.auth.signInWithPopup(provider);

      const url = this.redirectUrl || 'action';
      this.toastr.success("Now, let's go to the action.", 'Good job!');
      this.router.navigate([url]);

    } catch (error) {
      this.handleError(error);
    }
  }

  public signUpWithFb() {
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

  public async signInWithEmail(email: string, password: string, persistence: boolean, url: string) {
    try {
      if (persistence) await this.afAuth.auth.setPersistence('local');
      await this.afAuth.auth.signInWithEmailAndPassword(email, password);

      this.toastr.success("Now, let's go to the action.", 'Good job!');
      this.router.navigate([url]);

    } catch (error) {
      this.handleError(error);
    }
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

  get authenticated(): boolean {
    return this.authState !== null;
  }
  get currentUserObservable(): any {
    return this.afAuth.auth
  }

  private handleError(error: any) {
    // We inform the user that something went wrong with their registration
    this.toastr.error(error.message, 'Something went wrong:');
    console.log(error);

    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.'
    );
  };


}
