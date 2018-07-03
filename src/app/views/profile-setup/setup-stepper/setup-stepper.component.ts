import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators, FormControl } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { CoverPhotoDialogComponent } from '../cover-photo-dialog/cover-photo-dialog.component';
import { CoverLetterDialogComponent } from '../cover-letter-dialog/cover-letter-dialog.component';
import { ProfilePhotoDialogComponent } from '../profile-photo-dialog/profile-photo-dialog.component';

@Component({
  selector: 'app-setup-stepper',
  templateUrl: './setup-stepper.component.html',
  styleUrls: ['./setup-stepper.component.scss']
})
export class SetupStepperComponent implements OnInit {
  selectedStepIndex: number;

  public selectTypeForm: FormGroup;
  public profileTypeOptions = ['Director', 'Actor'];

  public personalInfoForm: FormGroup;
  public carrierForm: FormGroup;
  public profileForm: FormGroup;
  

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.buildSelectTypeForm();
    this.buildPersonalInfoForm();
    this.buildCarrierForm();
    this.buildProfileForm();
  }

  buildSelectTypeForm() {
    this.selectTypeForm = this.fb.group({
      profileType: ['', Validators.required]
    })
  }

  buildPersonalInfoForm() {
    this.personalInfoForm = this.fb.group({
      
    })
  }
  
  buildCarrierForm() {
    this.carrierForm = this.fb.group({
      
    })
  }
  
  buildProfileForm() {
    this.profileForm = this.fb.group({
      
    })
  }

  changeProfileCoverPhoto()
  {
    const dialogRef = this.dialog.open(CoverPhotoDialogComponent, {
      width: '650px',
      // height: '650px',
      data: { }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  openCoverletterdialog() {
    const dialogRef = this.dialog.open(CoverLetterDialogComponent, {
      width: '650px',
      data: { }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  
  changeProfilePhoto()
  {
    const dialogRef = this.dialog.open(ProfilePhotoDialogComponent, {
      width: '450px',
      height: '515px',
      data: { }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });

  }

  // Footer jump fix
  stepAnimationDone(e) {
    console.log('animaiton done', this.selectedStepIndex);
    let footer:any = document.getElementsByClassName(`footer-${this.selectedStepIndex}`)[0];

    if(footer) {
      footer.style = "opacity: 1;opacity: 1";
    } else {
      footer = document.getElementsByClassName(`footer-0`)[0];
      footer.style = "display: block;opacity: 1";
    }
    
  }

  selectionChange(e) {
    this.selectedStepIndex = e.selectedIndex;
    let footer:any = document.getElementsByClassName(`footer-${this.selectedStepIndex}`)[0];
    footer.style = "opacity: 0;display: none";

  }

  

}
