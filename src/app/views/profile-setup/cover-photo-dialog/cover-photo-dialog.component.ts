import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-cover-photo-dialog',
  templateUrl: './cover-photo-dialog.component.html',
  styleUrls: ['./cover-photo-dialog.component.scss']
})
export class CoverPhotoDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit() {
  }

}
