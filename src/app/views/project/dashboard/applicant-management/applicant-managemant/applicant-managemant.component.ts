import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ApplicantTransferComponent } from '../applicant-transfer/applicant-transfer.component';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-applicant-managemant',
  templateUrl: './applicant-managemant.component.html',
  styleUrls: ['./applicant-managemant.component.scss']
})
export class ApplicantManagemantComponent implements OnInit {

  showNote: boolean = false;
  showNoteLeft: boolean = false;
  showThumbList: boolean = false;

  animal: string;
  name: string;

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  public selectApplicant() {
    console.log('Applicant Selected');
  }

  showLeftSideNote(noteId: string) {
    this.showNoteLeft = true;
  }

  closeLeftSideNote() {
    this.showNoteLeft = false;
  }

  showTopNote(noteId: string) {
    this.showNote = true;
  }

  closeTopNote() {
    this.showNote = false;
  }

  showProfileThumbList() {
    if(this.showThumbList) {
      this.showThumbList = false;
    }else {
      this.showThumbList = true;
    }

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ApplicantTransferComponent, {
      width: '500px',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

}
