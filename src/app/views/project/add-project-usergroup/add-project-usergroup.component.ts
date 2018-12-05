import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from 'src/app/core/services/project.service';
import { userGroup, ActiveUser, groupData, depertment, depertmentObject } from 'src/app/core/models/models';

export interface Member {
  createdAt?: firebase.firestore.Timestamp;
  modifiedAt?: firebase.firestore.Timestamp;

  name?: string;
  role?: string;
  position?: string;
  userId?: string;
  user?: ActiveUser;
}


export interface Depertment {
  createdAt?: firebase.firestore.Timestamp;
  modifiedAt?: firebase.firestore.Timestamp;

  title?: string;
  teamLeader?: string;

  members?: Array<Member>;
}

@Component({
  selector: 'app-add-project-usergroup',
  templateUrl: './add-project-usergroup.component.html',
  styleUrls: ['./add-project-usergroup.component.scss']
})
export class AddProjectUsergroupComponent implements OnInit {

  userGroups: Array<groupData> = [];

  constructor(
    public projectService: ProjectService,
    private router: Router
  ) {

  }

  ngOnInit() {
    console.log(this.projectService.project);
  }

  public nextStep() {
    // this.router.navigate(["/projects/new/stuffs"]);
    this.previewPageData();
  }

  public prevStep() {
    this.router.navigate(["/projects/new"]);
  }

  public cancelProjectCreate() {
    this.router.navigate(["/projects"]);
  }

  public addUserGroup() {


    var userGroup: groupData = {
      groupId: this.projectService.makeid()
    };
    this.userGroups.push(userGroup);
    this.projectService.project.projectDepertments = this.userGroups;

    console.log(this.projectService.project.projectDepertments);
  }

  getGroupData(event: depertmentObject, userGroup: userGroup) {
    // userGroup = event;
    // console.log('In UserGroup: -------------' + event.groupTitle);
    // this.userGroups.forEach(element => {
      // if (element.groupId == event.groupId) {
        // var index = this.userGroups.indexOf(userGroup);
        // this.userGroups[index] = event;
        // element.groupTitle = event.groupTitle;
        // element.members = event.members;
        // element.teamLeader = event.teamLeader;

        // console.log('In element'+element);
        // console.log('In group'+element);
      // }
    // });

    var depertmentObject: depertmentObject = event;

    console.log('---------------------------');
    console.log(depertmentObject);

  }

  public previewPageData() {
    console.log(this.userGroups);

    // this.projectService.addUserGroupData(this.userGroups);
    // this.userGroups.forEach(element => {
    //   console.log(element.groupTitle);
    //   let members: Array<string> = [];
    //   let dept: depertment = {
    //     title: element.groupTitle,
    //     teamLeader: element.teamLeader.user.uid,
    //   };

    //   element.members.forEach(member => {
    //     members.push(member.user.uid);
    //   });

    //   dept.members = members;

    //   this.projectService.createDepertment(dept);
    // });


  }

}
