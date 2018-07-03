import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EmailVerifyDialogComponent } from '../email-verify-dialog/email-verify-dialog.component';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this.openEmailVerifyDialog();
    }, 100);
  }

  openEmailVerifyDialog() {
    const dialogRef = this.dialog.open(EmailVerifyDialogComponent, {
      width: '450px',
      data: { }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
