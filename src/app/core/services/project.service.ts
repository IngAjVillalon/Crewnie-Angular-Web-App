import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { projectItem, ActiveUser, groupData, userGroup, depertment, member, Department, Project, Position } from '../models/models';
import { UserService } from './user.service';
import { firestore } from 'firebase/app';
import { Timestamp } from 'rxjs/internal/operators/timestamp';
import 'rxjs/add/operator/toPromise';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { JsonPipe } from '@angular/common';



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
    private userService: UserService,
    private http: HttpClient
  ) {

  }

  public getProject(userId: string) {
    return this.db.collection('projects', ref => ref.where('creatorId', '==', userId));
  }

  public createNewProject() {
    const projectId = this.db.createId();
    const creatorId = this.userService.getUserId();
    const createdAt = new Date(Date.now() * 24 * 60 * 60 * 1000);

    this.project._id = projectId;
    this.project.creatorId = creatorId;


    this.db.collection('projects').doc(projectId).set(this.project);
  }

  public cancelProjectCreation() {
    this.db.collection("projects").doc(this.project._id).delete();
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
    const projectId = this.project._id;
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

  public addProjectInfo(project: any) {
    console.log('Add Project Info To MongoDB');
    console.log(project);


    var projectData = {
      "creatorId": project.creatorId,
      "private": project.private,
      "title": project.title,
      "coverPhotoUrl": project.coverPhoto,
      "type": project.type,
      "agency": project.agency,
      "genras": project.genras,
      "startDate": project.startDate,
      "endDate": project.endDate,
      "categories": project.categories,
      "hasUnion": project.hasUnion,
      "unions": project.unions,
      "departments": [],
      "positions": []
    }
    return this.http.post('https://crewnie.herokuapp.com/api/projects', projectData);
  }

  public getProjectById(projectId: string) {
    let currentProject: Project = {};
    let reqUrl = 'https://crewnie.herokuapp.com/api/projects/id/' + projectId;
    return this.http.get(reqUrl);
    // this.http.get(reqUrl).subscribe(response => {
    //   currentProject = response;
    //   currentProject.departments = departments;

    //   console.log(currentProject);
    // })
  }

  public addDepartments(departments: Department[]) {
    this.project.departments = departments;
    var options = { headers: new HttpHeaders().set('Content-Type', 'application/json').set('Access-Control-Allow-Origin', 'http://localhost:4200') };

    let reqUrl = 'https://crewnie.herokuapp.com/api/projects/' + this.getCurrentProjectId();
    return this.http.put(reqUrl, { "departments": departments }, options);

    // let currentProject: Project = {};
    // let reqUrl = 'https://crewnie.herokuapp.com/api/projects/id/'+this.getCurrentProjectId();
    // this.http.get(reqUrl).subscribe(response => {
    //   currentProject = response;
    //   currentProject.departments = departments;

    //   console.log(currentProject);
    // })

    // this.saveProjectLocal(this.project);
  }

  public addAllDepartments(departments: Department[]) {
    this.project.departments = departments;
    var options = { headers: new HttpHeaders().set('Content-Type', 'application/json').set('Access-Control-Allow-Origin', 'http://localhost:4200') };
    let reqUrl = 'https://crewnie.herokuapp.com/api/depertments/all';
    return this.http.post(reqUrl, departments);

  }

  public getDepartmentsByProjectId(projectId: string) {
    let reqUrl = 'https://crewnie.herokuapp.com/api/depertments/project/' + this.getCurrentProjectId();
    return this.http.get(reqUrl);
  }

  public setProjectId(projectId: string) {
    this.project._id = projectId;
  }

  public getProjectId() {
    return this.project._id;
  }



  // Save project info to local storage
  public setCurrentProjectId(projectId: string) {
    localStorage.setItem('currentProjectId', projectId);
  }

  public getCurrentProjectId() {
    return localStorage.getItem('currentProjectId');
  }

  public setCurrentDepartmentId(departmentId: string) {
    localStorage.setItem('currentDepartmentId', departmentId);
  }

  public getCurrentDepartmentId() {
    return localStorage.getItem('currentDepartmentId');
  }

  public saveProjectLocal(project: Project) {
    localStorage.setItem('currentProject', JSON.stringify(project));
  }

  public getProjectLocal() {
    return JSON.parse(localStorage.getItem('currentProject'));
  }

  // Position Operations

  public addAllPositions(positions: Position[]) {

  }

  public UpdateAllPositions(positions: Position[]) {

  }

  public AddPreProductionPositionsToDepartments(positions: Position[]) {
    let reqUrl = 'https://crewnie.herokuapp.com/api/position/all';
    return this.http.post(reqUrl, positions);
  }

  public AddProductionPositionsToDepartments(positions: Position[], departmentId: string) {

  }

  public AddPostProductionPositionsToDepartments(positions: Position[], departmentId: string) {

  }
}
