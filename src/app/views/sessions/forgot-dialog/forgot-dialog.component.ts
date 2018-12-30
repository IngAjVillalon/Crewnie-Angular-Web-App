import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { AuthService } from "src/app/core/services/auth/auth.service";
import { SweetAlert2Service } from "src/app/core/services/sweet-alert2.service";

@Component({
  selector: 'app-forgot-dialog',
  templateUrl: './forgot-dialog.component.html',
  styleUrls: ['./forgot-dialog.component.scss']
})
export class ForgotDialogComponent implements OnInit {

  forgotForm = new FormGroup({
    'email': new FormControl(this.data.email)
  });

  constructor(
    private dialogRef: MatDialogRef<ForgotDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
    private authService: AuthService,
    private alertService: SweetAlert2Service
  ) { }

  ngOnInit() {

  }

  public sendPasswordResetEmail() {
    const email = this.forgotForm.value.email;

    this.authService.afAuth.auth.sendPasswordResetEmail(email).then(() => {
      this.alertService
        .success({
          title: 'Reset email sent!',
          text: 'Now check your email and reset your password.',
        })
        .subscribe(() => {
          this.dialogRef.close(email);
        });
    }).catch((e) => {
      // We inform the user that something went wrong with their password reset
      this.alertService
        .error({
          title: 'Something went wrong!',
          text: e.message,
        });

      console.log(e);
    });
  }

}
