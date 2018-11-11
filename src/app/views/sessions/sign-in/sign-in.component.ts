import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/core/services/auth.service";
import { Router } from "@angular/router";

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { ForgotDialogComponent } from "../forgot-dialog/forgot-dialog.component";
import { FormGroup, FormControl, FormBuilder } from "@angular/forms";

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.scss"]
})
export class SignInComponent implements OnInit {

  isNewUser = false;
  email = "";
  password = "";
  errorMessage = "";
  error: { name: string; message: string } = { name: "", message: "" };

  signinForm = new FormGroup({
    email: new FormControl(""),
    password: new FormControl("")
  });

  constructor(
    private dialog: MatDialog,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    // this.openForgotDialog()
  }

  openForgotDialog(e) {
    e.preventDefault();
    // console.log(e)
    const dialogRef = this.dialog.open(ForgotDialogComponent, {
      width: "450px",
      disableClose: true,
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
    });
  }

  checkUserInfo() {
    if (this.authService.isUserEmailLoggedIn) {
      this.router.navigate(['/user'])
    }
  }

  clearErrorMessage() {
    this.errorMessage = '';
    this.error = { name: '', message: '' };
  }

  changeForm() {
    this.isNewUser = !this.isNewUser
  }


  signIn() {
    if (this.validateForm(this.signinForm.controls.email.value, this.signinForm.controls.password.value)) {
      this.authService
        .signInWithEmail(this.signinForm.controls.email.value, this.signinForm.controls.password.value)
        .then(() => {
          this.router.navigate(["/profile/info"]);
        })
        .catch(_error => {
          this.error = _error;
          this.router.navigate(["/"]);
        });
    }
  }

  validateForm(email: string, password: string): boolean {
    if (email.length === 0) {
      this.errorMessage = "Please enter Email!";
      return false;
    }

    if (password.length === 0) {
      this.errorMessage = "Please enter Password!";
      return false;
    }

    if (password.length < 6) {
      this.errorMessage = "Password should be at least 6 characters!";
      return false;
    }

    this.errorMessage = "";

    return true;
  }

  isValidMailFormat(email: string) {
    const EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    if (email.length === 0 && !EMAIL_REGEXP.test(email)) {
      return false;
    }

    return true;
  }

  signUpWithGmali() {
    this.authService
      .signUpWithGmail()
      .then(() => {
        this.router.navigate(["/profile/info"]);
      })
      .catch(_error => {
        this.error = _error;
        this.router.navigate(["/sessions/signup"]);
      });
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
