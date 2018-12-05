import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActiveUser, userGroup, userGroupUser, teamMember, groupData, depertment, member, depertmentObject } from 'src/app/core/models/models';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormControl, FormGroup } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Member, ProjectService } from 'src/app/core/services/project.service';


@Component({
  selector: 'usergroup-card',
  templateUrl: './usergroup-card.component.html',
  styleUrls: ['./usergroup-card.component.scss']
})
export class UsergroupCardComponent implements OnInit {

  depertmentObject: depertmentObject = {};
  users: Array<member> = [];
  user: member;

  teamLeader: member = <member>{};
  isAdminSelected: boolean = false;

  crewnieUsers$: AngularFirestoreCollection<ActiveUser>;
  crewnieUsers: ActiveUser[];
  crewnieUsersFiltered: ActiveUser[];
  crewnieUsersTeamLeadFiltered: ActiveUser[];
  crewnieUser: ActiveUser;

  addNewMember: boolean = false;
  public addMemberForm = new FormGroup({
    addMember: new FormControl("")
  });

  public addTeamLeadForm = new FormGroup({
    addTeaamLead: new FormControl("")
  });

  public groupData = new FormGroup({
    groupTitle: new FormControl('')
  })



  members: Array<member> = [];


  myControl = new FormControl();
  addMember = new FormControl();
  options: ActiveUser[] = [];
  filteredOptions: ActiveUser[];

  @Input('userGroup') userGroup: groupData;
  @Output('userGroup') userGroupReturn: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private storage: AngularFireStorage,
    private db: AngularFirestore,
    public projectService: ProjectService
  ) {

    this.crewnieUsers$ = this.db.collection('users');
    this.crewnieUsers$.valueChanges().subscribe(users => {
      this.crewnieUsers = users;
    });

    console.log(this.userGroup);

  }

  ngOnInit() {

    this.addMemberForm.controls['addMember'].valueChanges.subscribe(value => {
      this._filterMember(value);
    })

    this.addTeamLeadForm.controls['addTeaamLead'].valueChanges.subscribe(value => {
      this._filterTeamLead(value);
    })

  }

  private _filterTeamLead(value: string) {
    this.crewnieUsersTeamLeadFiltered = ('image') ? this.crewnieUsers.filter(p => p.firstName.toLocaleLowerCase().includes(value.toLocaleLowerCase())) : this.crewnieUsers;
  }

  private _filterMember(value: string) {
    this.crewnieUsersFiltered = ('image') ? this.crewnieUsers.filter(p => p.firstName.toLocaleLowerCase().includes(value.toLocaleLowerCase())) : this.crewnieUsers;
  }


  public addUser() {
    this.addNewMember = true;
    this.groupChangeEvent();
  }

  public selectTeamLeader(userId: string) {
    this.isAdminSelected = false;
  }

  public selectTeamLead(value: any) {
    this.isAdminSelected = true;
    const user: ActiveUser = this.getMemberById(value);
    this.teamLeader.position = 'Team Lead';
    this.teamLeader.role = 'admin';
    this.teamLeader.user = user;
    this.teamLeader.name = user.displayName;
    this.teamLeader.userId = user.uid;

    this.userGroup.teamLeader = this.teamLeader;

    this.addTeamLeadForm.setValue({ 'addTeaamLead': '' });
    this.groupChangeEvent();
  }

  public selectTeamMember(value: any) {
    this.addNewMember = false;
    this.addMemberForm.setValue({ 'addMember': '' });
    const user: ActiveUser = this.getMemberById(value);
    const currentUser: member = {
      user: user,
      position: 'actor',
      role: 'user',
      name: user.displayName
    }
    this.users.push(currentUser);

    this.userGroup.members = this.users;
    this.groupChangeEvent();
  }

  public cancelTeamMember(userId: string) {
    this.users = this.userGroup.members;
    for (var i = 0; i < this.users.length; i++) {
      if (this.users[i].user.uid == userId)
        this.users.splice(i);
    }
    this.userGroup.members = this.users;
    this.groupChangeEvent();
  }


  // Get Selected User
  getMemberById(userId: string) {
    return this.crewnieUsers.find(i => i.uid === userId);
  }

  public groupChangeEvent() {


    // List depertment members
    let depertmentMembers: Array<string> = [];
    this.userGroup.members.forEach(element => {
      depertmentMembers.push(element.user.uid);
    });

    // Create Depertment
    let depertment: depertment = {};
    depertment.title = this.userGroup.groupTitle;
    depertment.teamLeader = this.userGroup.teamLeader.user.uid;
    depertment.members = depertmentMembers;

    // Create Team Leader
    var teamLeaderId = this.userGroup.teamLeader.user.uid;
    var teamLeader: member = {};
    teamLeader.memberId = teamLeaderId;
    teamLeader.name = (this.userGroup.teamLeader.user.firstName + " " + this.userGroup.teamLeader.user.lastName);
    teamLeader.position = this.userGroup.teamLeader.position;
    teamLeader.role = this.userGroup.teamLeader.role;
    teamLeader.profilePhoto = this.userGroup.teamLeader.user.profilePhotoUrl;
    teamLeader.user = this.userGroup.teamLeader.user;


    // Create Members
    var memberCollection: Array<member> = [];

    this.userGroup.members.forEach(element => {
      var member: member = {};
      var memberId = element.user.uid;

      member.memberId = memberId;
      member.name = (element.user.firstName + " " + element.user.lastName);
      member.position = element.position;
      member.role = element.role;
      member.profilePhoto = element.user.profilePhotoUrl;
      member.userId = element.user.uid;
      member.user = element.user;

      memberCollection.push(member);
    });

    this.depertmentObject.depertment = depertment;
    this.depertmentObject.teamLeader = teamLeader;
    this.depertmentObject.members = memberCollection;

    this.userGroupReturn.emit(this.depertmentObject);
  }



  public deleteGroup() {

    // List depertment members
    let depertmentMembers: Array<string> = [];
    this.userGroup.members.forEach(element => {
      depertmentMembers.push(element.user.uid);
    });

    // Create Depertment
    let depertment: depertment = {};
    depertment.title = this.userGroup.groupTitle;
    depertment.teamLeader = this.userGroup.teamLeader.user.uid;
    depertment.members = depertmentMembers;

    // Create Team Leader
    var teamLeaderId = this.userGroup.teamLeader.user.uid;
    var teamLeader: member = {};
    teamLeader.memberId = teamLeaderId;
    teamLeader.name = (this.userGroup.teamLeader.user.firstName + " " + this.userGroup.teamLeader.user.lastName);
    teamLeader.position = this.userGroup.teamLeader.position;
    teamLeader.role = this.userGroup.teamLeader.role;
    teamLeader.profilePhoto = this.userGroup.teamLeader.user.profilePhotoUrl;
    teamLeader.user = this.userGroup.teamLeader.user;


    // Create Members
    var memberCollection: Array<member> = [];

    this.userGroup.members.forEach(element => {
      var member: member = {};
      var memberId = element.user.uid;

      member.memberId = memberId;
      member.name = (element.user.firstName + " " + element.user.lastName);
      member.position = element.position;
      member.role = element.role;
      member.profilePhoto = element.user.profilePhotoUrl;
      member.userId = element.user.uid;
      member.user = element.user;

      memberCollection.push(member);
    });

    this.depertmentObject.depertment = depertment;
    this.depertmentObject.teamLeader = teamLeader;
    this.depertmentObject.members = memberCollection;

    this.userGroupReturn.emit(this.depertmentObject);

    // this.projectService.createDepertment(depertment, teamLeader, memberCollection);

  }

}
