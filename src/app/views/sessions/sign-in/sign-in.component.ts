import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ForgotDialogComponent } from '../forgot-dialog/forgot-dialog.component';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    // this.openForgotDialog()
  }

  openForgotDialog(e) {
    e.preventDefault();
    // console.log(e)
    const dialogRef = this.dialog.open(ForgotDialogComponent, {
      width: '450px',
      disableClose: true,
      data: { }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
