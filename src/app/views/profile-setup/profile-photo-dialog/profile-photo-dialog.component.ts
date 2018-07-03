import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-profile-photo-dialog',
  templateUrl: './profile-photo-dialog.component.html',
  styleUrls: ['./profile-photo-dialog.component.scss']
})
export class ProfilePhotoDialogComponent implements OnInit {

  constructor( @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
  }

}
