import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { projectItem } from 'src/app/core/models/models';
import { Router } from '@angular/router';
import { ProjectService } from 'src/app/core/services/project.service';
import { Position } from 'src/app/core/models/models';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'position-card',
  templateUrl: './position-card.component.html',
  styleUrls: ['./position-card.component.scss']
})
export class PositionCardComponent implements OnInit {

  @Input('position') position: Position;
  @Output('position') positionReturn: EventEmitter<any> = new EventEmitter<any>();
  // @Output() childEvent = new EventEmitter();

  public positionForm = new FormGroup({
    location: new FormControl(''),
    salary: new FormControl(''),
    duration: new FormControl(''),
    vacancy: new FormControl(''),
    startDate: new FormControl(''),
    endDate: new FormControl('')
  })

  constructor(
    public projectService: ProjectService,
    private router: Router
  ) {
    console.log(this.position);
  }

  ngOnInit() {
  }

  public viewProjectDashboard(projectId: string) {
    this.router.navigate(["/projects/dashboard"]);
  }

  test(position: Position){
    // this.childEvent.emit(this.position);
}


  public deletePosition(index: number) {
    console.log(index);
    this.positionReturn.emit(index);
  }

  public positionDataChangeEvent() {
    console.log("data Changed");
    console.log(this.position);
  }

}
