import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-view-video-portfolio',
  templateUrl: './view-video-portfolio.component.html',
  styleUrls: ['./view-video-portfolio.component.scss']
})
export class ViewVideoPortfolioComponent implements OnInit {

  constructor(private _location: Location) { }

  ngOnInit() {
  }

  goBack() {
    this._location.back();
  }
}
