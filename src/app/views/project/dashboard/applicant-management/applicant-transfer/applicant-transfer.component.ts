import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ApplicantManagemantComponent } from '../applicant-managemant/applicant-managemant.component';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-applicant-transfer',
  templateUrl: './applicant-transfer.component.html',
  styleUrls: ['./applicant-transfer.component.scss']
})
export class ApplicantTransferComponent implements OnInit {
  @Inject(MAT_DIALOG_DATA) public data: DialogData
  constructor(
    public dialogRef: MatDialogRef<ApplicantManagemantComponent>
  ) { }

  ngOnInit() {
  }

  public closeTransferDialog(): void {
    this.dialogRef.close();
  }

}
