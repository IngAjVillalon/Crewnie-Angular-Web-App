import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ProjectService } from 'src/app/core/services/project.service';
import { Router } from '@angular/router';
import { trigger, transition, style, animate, useAnimation } from '@angular/animations';
import { bounce, fadeIn } from 'ng-animate';
import { Position } from 'src/app/core/models/models';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';


// export interface position {
//   positionIndex?: number;
//   positionId?: string;
//   position?: string;
//   location?: string;
//   salary?: string;
//   vacent?: number;
//   startDate?: firebase.firestore.Timestamp;
//   endDate?: firebase.firestore.Timestamp;
// }

@Component({
  selector: 'app-project-stuff',
  templateUrl: './project-stuff.component.html',
  styleUrls: ['./project-stuff.component.scss'],
  animations: [
    trigger('fadeIn', [transition('* => *', useAnimation(fadeIn, {
      params: { timing: 0.3 }
    }))])
  ],
})
export class ProjectStuffComponent implements OnInit {

  preProduction: boolean = true;
  production: boolean = false;
  postProduction: boolean = false;
  positionFilterString: string = '';

  positions: Array<Position> = [];

  preProductionPositions: Array<Position> = [];
  productionPositions: Array<Position> = [];
  postProductionPositions: Array<Position> = [];

  constructor(
    public projectService: ProjectService,
    private router: Router,
    private location: Location
  ) {

    console.log(this.projectService.getCurrentDepartmentId());
    console.log(this.projectService.getCurrentProjectId());
  }

  ngOnInit() {
  }

  // public addPostion(position: string) {
  //   const data: position = {
  //     positionIndex: this.positions.length + 1,
  //     positionId: this.projectService.makeid(),
  //     position: position,
  //     location: '',
  //     salary: '',
  //     vacent: 0,
  //     startDate: null,
  //     endDate: null
  //   }

  //   this.positions.push(data);
  // }


  public addPreProductionPosition(position: string) {

    let _position: Position = {};

    _position.projectId = this.projectService.getCurrentProjectId();
    _position.departmentId = this.projectService.getCurrentDepartmentId();
    _position.departmentState = "Pre Production";
    _position.index = this.preProductionPositions.length + 1;
    _position.title = position;
    _position.duration = 'daily';
    _position.location = '';
    _position.salary = '';
    _position.vacancy = 0;
    _position.startDate = new Date();
    _position.endDate = new Date();

    this.preProductionPositions.push(_position);
  }

  public addProductionPosition(position: string) {
    let _position: Position = {};

    _position.projectId = this.projectService.getCurrentProjectId();
    _position.departmentId = this.projectService.getCurrentDepartmentId();
    _position.departmentState = "Production";
    _position.index = this.productionPositions.length + 1;
    _position.title = position;
    _position.duration = 'daily';
    _position.location = '';
    _position.salary = '';
    _position.vacancy = 0;
    _position.startDate = new Date();
    _position.endDate = new Date();

    this.productionPositions.push(_position);
  }

  public addPostductionPosition(position: string) {

    let _position: Position = {};

    _position.projectId = this.projectService.getCurrentProjectId();
    _position.departmentId = this.projectService.getCurrentDepartmentId();
    _position.departmentState = "Post Production";
    _position.index = this.postProductionPositions.length + 1;
    _position.title = position;
    _position.duration = 'daily';
    _position.location = '';
    _position.salary = '';
    _position.vacancy = 0;
    _position.startDate = new Date();
    _position.endDate = new Date();

    this.postProductionPositions.push(_position);
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
    this.router.navigate(["/projects/dashboard/application"]);
  }

  public prevStep() {
    this.router.navigate(["/projects/dashboard/application"]);
    // this.location.back();
  }

  public cancelAddStuff() {
    this.router.navigate(["/projects"]);
  }

  test(position) {
    var index = this.positions.indexOf(position);
    if (index !== -1) this.positions.splice(index, 1);
    console.log(position);
  }

  removePosition(event: any, position: Position, positions: Position[]) {
    // var index = this.positions.indexOf(position);
    // if (index !== -1) this.positions.splice(index, 1);
    console.log(event);
    console.log(position);
    console.log(positions);

    // this.projectService.addAllDepartments([])
    // .pipe(switchMap((response)=>{
    //   return this.projectService.addDepartments([]).pipe(map(a=> {
    //     return {"dpts": response, "dept": a};
    //   }));
    // })).subscribe(Response =>{

    // })
  }

  removePositionFromPreProduction(event: any, position: Position) {
    console.log("Pre-Production");
    console.log(event);
    console.log(position);

    var index = this.preProductionPositions.indexOf(position);
    if (index !== -1) this.preProductionPositions.splice(index, 1);
  }

  removePositionFromProduction(event: any, position: Position) {
    console.log("Production");
    console.log(event);
    console.log(position);

    var index = this.productionPositions.indexOf(position);
    if (index !== -1) this.productionPositions.splice(index, 1);
  }
  removePositionFromPostProduction(event: any, position: Position) {
    console.log("Post-Production");
    console.log(event);
    console.log(position);

    var index = this.postProductionPositions.indexOf(position);
    if (index !== -1) this.postProductionPositions.splice(index, 1);
  }

  public savePositions() {
    console.log('ProjectId: '+ this.projectService.getCurrentProjectId());
    console.log('DepartmentId: '+ this.projectService.getCurrentDepartmentId());
    console.log(this.preProductionPositions);
    console.log(this.productionPositions);
    console.log(this.postProductionPositions);

    if(this.preProductionPositions.length > 0) {
      this.projectService.AddPreProductionPositionsToDepartments(this.preProductionPositions).subscribe( response => {
        console.log(response);
      })
    }
    if(this.productionPositions.length > 0) {
      this.projectService.AddPreProductionPositionsToDepartments(this.productionPositions).subscribe( response => {
        console.log(response);
      })
    }
    if(this.postProductionPositions.length > 0) {
      this.projectService.AddPreProductionPositionsToDepartments(this.postProductionPositions).subscribe( response => {
        console.log(response);
      })
    }
  }

}
