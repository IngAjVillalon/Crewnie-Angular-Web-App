import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface DialogData {
  isUserReady: boolean;
}

@Component({
  selector: 'app-email-verify-dialog',
  templateUrl: './email-verify-dialog.component.html',
  styleUrls: ['./email-verify-dialog.component.scss']
})
export class EmailVerifyDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<EmailVerifyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private authservice: AuthService
  ) { }

  ngOnInit() {
  }


  userIsReady(): void{
    // this.data.isUserReady = true;
    this.dialogRef.close(true);
  }

  resendVarificationCode() {
    // this.authservice.
  }
}
