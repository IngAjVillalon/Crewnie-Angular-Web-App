import { Component, OnInit } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material';

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

  constructor() { }

  ngOnInit() {
  }

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
    {title: 'Crewnie Website', views: 172, day: 3, tags:['Video','Pilot','Production']},
    {title: 'Crewnie Website', views: 172, day: 3, tags:['Video','Pilot','Production']},
    {title: 'Crewnie Website', views: 172, day: 3, tags:['Video','Pilot','Production']},
    {title: 'Crewnie Website', views: 172, day: 3, tags:['Video','Pilot','Production']},
    {title: 'Crewnie Website', views: 172, day: 3, tags:['Video','Pilot','Production']},
    {title: 'Crewnie Website', views: 172, day: 3, tags:['Video','Pilot','Production']},
  ];



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

}
