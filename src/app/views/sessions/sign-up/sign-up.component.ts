import { Component, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material";
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { EmailVerifyDialogComponent } from "../email-verify-dialog/email-verify-dialog.component";
import { AuthService } from "src/app/core/services/auth.service";
import { Router } from "@angular/router";

import { PasswordStrengthBarComponent } from "ng2-password-strength-bar";
import { distinctUntilChanged, debounceTime } from "rxjs/operators";

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.scss"]
})
export class SignUpComponent implements OnInit {
  public account = {
    password: <string>null
  };
  public barLabel: string = "Password strength:";
  public myColors = ["#DD2C00", "#FF6D00", "#FFD600", "#AEEA00", "#00C853"];
  private debounce: number = 10;

  signupForm = new FormGroup({
    toc_agreed: new FormControl(""),
    name: new FormControl(""),
    email: new FormControl(""),
    password: new FormControl("")
  });

  isNewUser = true;
  email = "";
  password = "";
  errorMessage = "";
  error: { name: string; message: string } = { name: "", message: "" };

  resetPassword = false;

  isUserReady = false;

  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.signupForm.valueChanges
      .pipe(
        debounceTime(this.debounce),
        distinctUntilChanged()
      )
      .subscribe(query => {
        this.account.password = query.password;
      });
  }

  checkUserInfo() {
    if (this.authService.isUserEmailLoggedIn) {
      this.router.navigate(["/profile/info"]);
    }
  }

  clearErrorMessage() {
    this.errorMessage = "";
    this.error = { name: "", message: "" };
  }

  changeForm() {
    this.isNewUser = !this.isNewUser;
  }

  signUp() {
    // this.openEmailVerifyDialog();
    if (
      this.validateForm(
        this.signupForm.controls.email.value,
        this.signupForm.controls.password.value,
        this.signupForm.controls.name.value,
        this.signupForm.controls.toc_agreed.value
      )
    ) {
      this.authService
        .signUpWithEmail(
          this.signupForm.controls.email.value,
          this.signupForm.controls.password.value
        )
        .then(() => {
          // this.router.navigate(['/user'])
          this.openEmailVerifyDialog();
        })
        .catch(_error => {
          this.error = _error;
          // this.router.navigate(['/'])
          this.openEmailVerifyDialog();
        });
    }
  }

  openEmailVerifyDialog() {
    const dialogRef = this.dialog.open(EmailVerifyDialogComponent, {
      width: "450px",
      disableClose: true,
      data: { isUserReady: this.isUserReady }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed", result);
      this.isUserReady = result;

      if (this.isUserReady) {
        this.authService
          .signInWithEmail(
            this.signupForm.controls.email.value,
            this.signupForm.controls.password.value
          )
          .then(() => {
            this.router.navigate(["/profile-setup"]);
          })
          .catch(_error => {
            this.error = _error;
            this.router.navigate(["/"]);
          });
      }
    });
  }

  validateForm(
    name: string,
    email: string,
    password: string,
    toc_agreed: boolean
  ): boolean {
    if (toc_agreed == false) {
      this.errorMessage = "Please Agree With Terms & Conditions";
      return false;
    }

    if (name.length === 0) {
      this.errorMessage = "Please enter Name";
      return false;
    }

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

        this.router.navigate(["/profile-setup"]);
      })
      .catch(_error => {
        this.error = _error;
        this.router.navigate(["/"]);
      });
  }

  signUpWithFacebook() {
    this.authService.signUpWithFb();
  }



}
