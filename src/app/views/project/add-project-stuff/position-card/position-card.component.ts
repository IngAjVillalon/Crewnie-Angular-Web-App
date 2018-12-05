import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { projectItem } from 'src/app/core/models/models';
import { Router } from '@angular/router';
import { ProjectService } from 'src/app/core/services/project.service';


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
  selector: 'position-card',
  templateUrl: './position-card.component.html',
  styleUrls: ['./position-card.component.scss']
})
export class PositionCardComponent implements OnInit {

  @Input('position') position: position;

  @Output() childEvent = new EventEmitter();

  constructor(
    public projectService: ProjectService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  public viewProjectDashboard(projectId: string) {
    this.router.navigate(["/projects/dashboard"]);
  }

  test(position: position){
    this.childEvent.emit(this.position);
}


  // public deletePosition(positionId: string) {
  //   this.buttonClick.emit(positionId);
  // }

}
