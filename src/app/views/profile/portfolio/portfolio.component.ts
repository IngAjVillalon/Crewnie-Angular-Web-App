import { Component, OnInit } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent, MatButtonToggleGroup} from '@angular/material';

export interface Fruit {
  name: string;
}

export interface portfolioItems {
  title: string;
  views: number;
  day: number;
  tags: Array<String>;
}

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {

  isAllProtfolio: Boolean = true;
  isVideo: Boolean = false;
  isImage: Boolean = false;
  isAudio: Boolean = false;
  isScript: Boolean = false;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  tags: Fruit[] = [
    {name: '#Videos'},
    {name: '#Pilot'}
  ];

  portfolioItems: portfolioItems[] = [
    {title: 'Crewnie Website', views: 172, day: 3, tags:['Video','Pilot','Production']},
    {title: 'Crewnie Website', views: 172, day: 3, tags:['Video','Pilot','Production']},
    {title: 'Crewnie Website', views: 172, day: 3, tags:['Video','Pilot','Production']},
    {title: 'Crewnie Website', views: 172, day: 3, tags:['Video','Pilot','Production']},
  ];

  constructor() { }

  ngOnInit() {
  }





  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.tags.push({name: value.trim()});
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(fruit: Fruit): void {
    const index = this.tags.indexOf(fruit);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  selectPortfolio(portfolio: number) {
    this.isAllProtfolio = false;
    this.isImage = false;
    this.isVideo = false;
    this.isAudio = false;
    this.isScript = false;

    if( portfolio === 0) {
      this.isAllProtfolio = true;
    }else if(portfolio === 1) {
      this.isImage = true;
    }else if(portfolio === 2) {
      this.isVideo = true;
    }else if(portfolio === 3) {
      this.isAudio = true;
    }else if(portfolio === 4) {
      this.isScript = true;
    }

  }

}
