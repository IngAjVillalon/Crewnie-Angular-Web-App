import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/core/services/project.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { depertment, ActiveUser } from 'src/app/core/models/models';
import 'rxjs/add/operator/toPromise';
import { FormControl } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material';

export interface Depertment {
  id?: string;
  title?: string;
  positions?: Array<string>;
  allPositions?: any;
  pending?: Array<Position>;
  added?: Array<Position>;
  pendingPositions?: any;
  addedPositions?: any;
}
export interface Position {
  id?: string;
  title?: string;
  left?: number;
}


@Component({
  selector: 'app-project-application',
  templateUrl: './project-application.component.html',
  styleUrls: ['./project-application.component.scss']
})
export class ProjectApplicationComponent implements OnInit {

  panelOpenState = false;

  depertments$: AngularFirestoreCollection<Depertment>;
  depertments: Depertment[];

  positions$: AngularFirestoreCollection<Position>;
  positions: Position[];




  Depertments: Array<Depertment> = [];

  constructor(
    public projectService: ProjectService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private db: AngularFirestore
  ) {
    console.log("Start");
    this.depertments$ = this.projectService.getProjectDepertments('F5nYbyrl6QPZgNAChGsR');
    this.depertments$.valueChanges().subscribe(depertments => {
      this.depertments = depertments;
      this.getDepertments();
      console.log("Start - 2" + this.depertments);
    });
  }

  public getDepertments() {
    this.depertments.forEach(element => {

      this.db.collection('projects').doc('F5nYbyrl6QPZgNAChGsR')
        .collection('depertments').doc(element.id).
        collection('pending').valueChanges().subscribe(positions => {
          element.pending = positions;
        })

      this.db.collection('projects').doc('F5nYbyrl6QPZgNAChGsR')
        .collection('depertments').doc(element.id).
        collection('added').valueChanges().subscribe(positions => {
          element.added = positions;
        })

    });
  }

  async getPosition(depertmentId: string): Promise<Position> {
    console.log('Before');
    var positions = <Position>await this.projectService.getPosition(depertmentId);
    console.log('After');
    return positions;
  }

  private getPositionForDepertment(depertmentId: string) {
    this.positions$ = this.db.collection('projects').doc('F5nYbyrl6QPZgNAChGsR').collection('departments').doc('KKeReOFLKHnLBpM4qysj').collection('positions');
    this.positions$.valueChanges().subscribe(positions => {
      this.positions = positions;
    });
  }

  ngOnInit() {
  }

  public closeProjectDashboard() {
    this.router.navigate(["/projects"]);
  }

  public editPosition() {
    console.log('Edit Position');
    console.log(this.depertments);

  }

  public getPositions(depertmentId: string) {
    // this.db.collection('projects').doc(projectId).collection('departments');
  }

  public positionSelected(positionTitle: string) {
    console.log(positionTitle);
    this.getMatchUsers(positionTitle);
  }

  crewnieUsers$: AngularFirestoreCollection<ActiveUser>;
  crewnieUsers: ActiveUser[];
  crewnieUsersFiltered: ActiveUser[];
  crewnieUsersTeamLeadFiltered: ActiveUser[];
  crewnieUser: ActiveUser;

  crewnieUsersMatched: ActiveUser[];
  crewnieUsersRequest: ActiveUser[];
  crewnieUsersSENT: ActiveUser[];
  crewnieUsersLIKED: ActiveUser[];


  public getMatchUsers(title: string) {
    this.crewnieUsers$ = this.db.collection('users', ref => ref.where('profileType', '==', title));
    this.crewnieUsers$.valueChanges().subscribe(users => {
      this.crewnieUsers = users;
      this.crewnieUsersMatched = users;
      this.crewnieUsersRequest = users;
      this.crewnieUsersSENT = users;
      this.crewnieUsersLIKED = users;

    });
  }

  public tabIndexChanged(tabChangeEvent: MatTabChangeEvent) {
    var currentIndex = tabChangeEvent.index;
    console.log('index => ', currentIndex);



  }


}
