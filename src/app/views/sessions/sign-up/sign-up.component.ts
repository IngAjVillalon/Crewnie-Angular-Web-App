import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { AuthService } from "src/app/core/services/auth/auth.service";
import { Router } from "@angular/router";

import { PasswordStrengthBarComponent } from "ng2-password-strength-bar";
import { distinctUntilChanged, debounceTime } from "rxjs/operators";

import { SweetAlert2Service } from "src/app/core/services/sweet-alert2.service";

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

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertService: SweetAlert2Service
  ) { }

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

  async signUp() {
    try {
      const email = this.signupForm.get('email').value;
      const password = this.signupForm.get('password').value;
      const stageName = this.signupForm.get('name').value;

      const firebaseRegister = await this.authService.signUpWithEmail(email, password);

      this.alertService
        .success({
          title: 'Good job!',
          text: 'Now check your email and activate your account.',
        })
        .subscribe(() => {
          this.router.navigate(['/signin']);
        });

      await firebaseRegister.user.updateProfile({
        displayName: stageName,
        photoURL: null
      });
      await firebaseRegister.user.sendEmailVerification();

    } catch (error) {
      this.alertService
        .error({
          title: 'Something went wrong!',
          text: error.message,
        });
      console.log(error);
    }
  }

  signUpWithGmali() {
    this.authService.signUpWithGmail();
  }

  signUpWithFacebook() {
    this.authService.signUpWithFb();
  }



}
