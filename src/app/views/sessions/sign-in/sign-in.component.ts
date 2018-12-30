import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/core/services/auth/auth.service";
import { Router } from "@angular/router";

import { MatDialog } from "@angular/material";
import { ForgotDialogComponent } from "../forgot-dialog/forgot-dialog.component";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.scss"]
})
export class SignInComponent implements OnInit {

  signinForm = new FormGroup({
    email: new FormControl(""),
    password: new FormControl(""),
    remember: new FormControl("")
  });

  constructor(
    private dialog: MatDialog,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {

  }

  openForgotDialog(e) {
    e.preventDefault();
    const dialogRef = this.dialog.open(ForgotDialogComponent, {
      width: "450px",
      disableClose: true,
      data: {
        email: this.signinForm.value.email
      }
    });

    dialogRef.afterClosed().subscribe(email => {
      if (email) this.signinForm.setValue({
        email: email,
        password: '',
        remember: true
      });
    });
  }

  checkUserInfo() {
    if (this.authService.isUserEmailLoggedIn) {
      this.router.navigate(['/action'])
    }
  }


  signIn() {
    const email: string = this.signinForm.value.email;
    const password: string = this.signinForm.value.password;
    const remember: boolean = this.signinForm.value.remember;

    const redirectUrl = this.authService.redirectUrl || 'action';

    this.authService.signInWithEmail(email, password, remember, redirectUrl);
  }

  signUpWithGmali() {
    this.authService.signUpWithGmail();
  }

  // sendResetEmail() {
  //   this.clearErrorMessage();

  //   this.authService
  //     .resetPassword(this.email)
  //     .then(() => (this.resetPassword = true))
  //     .catch(_error => {
  //       this.error = _error;
  //     });
  // }
}
