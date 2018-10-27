import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-view-audio-portfolio',
  templateUrl: './view-audio-portfolio.component.html',
  styleUrls: ['./view-audio-portfolio.component.scss']
})
export class ViewAudioPortfolioComponent implements OnInit {

  constructor(private _location: Location) { }

  ngOnInit() {
  }

  goBack() {
    this._location.back();
  }

}
