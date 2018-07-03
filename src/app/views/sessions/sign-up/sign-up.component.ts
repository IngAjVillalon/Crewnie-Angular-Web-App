import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EmailVerifyDialogComponent } from '../email-verify-dialog/email-verify-dialog.component';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  signupForm: FormGroup;
  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.signupForm = this.fb.group({
      email: []
    })
  }
  signUp() {
    this.openEmailVerifyDialog();
  }

  openEmailVerifyDialog() {
    const dialogRef = this.dialog.open(EmailVerifyDialogComponent, {
      width: '450px',
      disableClose: true,
      data: { }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
