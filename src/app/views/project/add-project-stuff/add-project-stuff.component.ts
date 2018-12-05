import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ProjectService } from 'src/app/core/services/project.service';
import { Router } from '@angular/router';
import { trigger, transition, style, animate, useAnimation } from '@angular/animations';
import { bounce, fadeIn } from 'ng-animate';


export interface position {
  positionIndex?: number;
  positionId?: string;
  position?: string;
  location?: string;
  salary?: string;
  vacent?: number;
  startDate?: firebase.firestore.Timestamp;
  endDate?: firebase.firestore.Timestamp;
}

@Component({
  selector: 'app-add-project-stuff',
  templateUrl: './add-project-stuff.component.html',
  styleUrls: ['./add-project-stuff.component.scss'],
  animations: [
    trigger('fadeIn', [transition('* => *', useAnimation(fadeIn, {
      params: { timing: 0.3 }
    }))])
  ],
})
export class AddProjectStuffComponent implements OnInit {

  preProduction: boolean = true;
  production: boolean = false;
  postProduction: boolean = false;
  positionFilterString: string = '';

  positions: Array<position> = [];

  constructor(
    public projectService: ProjectService,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit() {
  }

  public addPostion(position: string) {
    const data: position = {
      positionIndex: this.positions.length + 1,
      positionId: this.projectService.makeid(),
      position: position,
      location: '',
      salary: '',
      vacent: 0,
      startDate: null,
      endDate: null
    }

    this.positions.push(data);
  }



  public chengeProductionStage(state: number) {
    if (state == 0) {
      this.preProduction = true;
      this.production = false;
      this.postProduction = false;
    } else if (state == 1) {
      this.preProduction = false;
      this.production = true;
      this.postProduction = false;
    } else if (state == 2) {
      this.preProduction = false;
      this.production = false;
      this.postProduction = true;
    }
  }


  public nextStep() {
    this.router.navigate(["/projects"]);
  }

  public prevStep() {
    this.router.navigate(["/projects/new/users"]);
    // this.location.back();
  }

  public cancelAddStuff() {
    this.router.navigate(["/projects"]);
  }

  test(position){
    var index = this.positions.indexOf(position);
    if (index !== -1) this.positions.splice(index, 1);
    console.log(position);
}

}
