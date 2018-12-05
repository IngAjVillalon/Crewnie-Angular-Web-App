import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { projectItem, ActiveUser, groupData, userGroup, depertment, member } from '../models/models';
import { UserService } from './user.service';
import { firestore } from 'firebase/app';
import { Timestamp } from 'rxjs/internal/operators/timestamp';
import 'rxjs/add/operator/toPromise';

export interface Member {
  createdAt?: firebase.firestore.Timestamp;
  modifiedAt?: firebase.firestore.Timestamp;

  name?: string;
  role?: string;
  position?: string;
  userId?: string;
  user?: ActiveUser;
}

export interface Depertments {
  createdAt?: firebase.firestore.Timestamp;
  modifiedAt?: firebase.firestore.Timestamp;

  title?: string;
  teamLeader?: string;

  members?: Array<Member>;
}

export interface Project {
  createdAt?: firebase.firestore.Timestamp;
  modifiedAt?: firebase.firestore.Timestamp;

  projectId?: string;
  creatorId?: string;

  projectPrivate?: boolean;

  projectTitle?: string;

  projectLocation?: string;

  projectStart?: firebase.firestore.Timestamp;
  projectEnd?: firebase.firestore.Timestamp;

  projectType?: string;
  projectGenres?: Array<string>;
  projectCategories?: Array<string>;
  projectUnions?: Array<string>;

  projectCover?: string;

  projectDepertments?: Array<groupData>

}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private firebaseTime: firebase.firestore.Timestamp;
  public hero: string;
  public project: Project = {};
  public coverPhotoFile;

  projects$: AngularFirestoreCollection<projectItem>;
  projects: projectItem[];

  constructor(
    private storage: AngularFireStorage,
    private db: AngularFirestore,
    private userService: UserService
  ) {

  }

  public getProject(userId: string) {
    return this.db.collection('projects', ref => ref.where('creatorId', '==', userId));
  }

  public createNewProject() {
    const projectId = this.db.createId();
    const creatorId = this.userService.getUserId();
    const createdAt = new Date(Date.now() * 24 * 60 * 60 * 1000);

    this.project.projectId = projectId;
    this.project.creatorId = creatorId;


    this.db.collection('projects').doc(projectId).set(this.project);
  }

  public cancelProjectCreation() {
    this.db.collection("projects").doc(this.project.projectId).delete();
  }

  public addUserGroupData(userGroups: Array<groupData>) {
    console.log(userGroups);

    userGroups.forEach(element => {
      console.log(element.groupTitle);
      let members: Array<string> = [];
      let dept: depertment = {
        title: element.groupTitle,
        teamLeader: element.teamLeader.user.uid,
      };

      element.members.forEach(element2 => {
        members.push(element2.user.uid);
      });

      dept.members = members;

      this.createDepertment(dept, element.teamLeader, element.members);
    });
  }

  public createDepertment(depertment: depertment, teamLeader: member, members: Array<member>) {
    const projectId = this.project.projectId;
    const depertmentId = this.db.createId();
    depertment.depertmentId = depertmentId;
    this.db.collection('projects').doc('F5nYbyrl6QPZgNAChGsR').collection('departments').doc(depertmentId).set(depertment);

    // Add Team Lead
    var teamLeaderId = teamLeader.user.uid;
    var teamLead: member = {};
    teamLead.memberId = teamLeaderId;
    teamLead.name = (teamLeader.user.firstName + " " + teamLeader.user.lastName);
    teamLead.position = teamLeader.position;
    teamLead.role = teamLeader.role;
    teamLead.profilePhoto = teamLeader.user.profilePhotoUrl;
    this.db.collection('projects').doc('F5nYbyrl6QPZgNAChGsR').collection('departments').doc(depertmentId).collection("members").doc(teamLeaderId).set(teamLead);


    // Add Members
    members.forEach(element => {
      var memberId = element.user.uid;
      var member: member = {};
      member.memberId = memberId;
      member.name = (element.user.firstName + " " + element.user.lastName);
      member.position = element.position;
      member.role = element.role;
      member.profilePhoto = element.user.profilePhotoUrl;
      this.db.collection('projects').doc('F5nYbyrl6QPZgNAChGsR').collection('departments').doc(depertmentId).collection("members").doc(memberId).set(member);
    });
  }

  public updateProjectOnDB() {

  }

  public makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 10; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  }

  public getProjectResponsibles(projectId: string) {
    // return this.db.collection('projects', ref => ref.where('creatorId', '==', userId));
    return this.db.collection('projects').doc(projectId).collection('responsibles');
  }

  public getProjectDepertments(projectId: string) {
    // return this.db.collection('projects', ref => ref.where('creatorId', '==', userId));
    return this.db.collection('projects').doc("F5nYbyrl6QPZgNAChGsR").collection('depertments');
  }

  public getProjectDepertmentsPositions(projectId: string) {
    // return this.db.collection('projects', ref => ref.where('creatorId', '==', userId));
    return this.db.collection('projects').doc(projectId).collection('depertments');
  }

  async getPosition(depertmentId: string) {
    console.log('Before');
    var positions = this.db.collection('projects').doc("F5nYbyrl6QPZgNAChGsR").collection("departments").doc(depertmentId).collection("positions");
    console.log('After');
    return positions;
  }
}
