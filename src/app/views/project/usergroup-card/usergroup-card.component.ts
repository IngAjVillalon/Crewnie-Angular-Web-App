import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActiveUser, userGroup, userGroupUser, teamMember, groupData, depertment, member, depertmentObject, Department, DepartmentUser } from 'src/app/core/models/models';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormControl, FormGroup } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { ProjectService } from 'src/app/core/services/project.service';


@Component({
  selector: 'usergroup-card',
  templateUrl: './usergroup-card.component.html',
  styleUrls: ['./usergroup-card.component.scss']
})
export class UsergroupCardComponent implements OnInit {

  teamLeaderSelected: boolean = false;
  teamMemberSelected: boolean = false;

  depertmentObject: depertmentObject = {};
  users: Array<DepartmentUser> = [];
  user: DepartmentUser;

  teamLeader: DepartmentUser = <DepartmentUser>{};
  teamMembers: Array<DepartmentUser> = [];

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

  @Input('department') department: Department;
  @Output('department') departmentReturn: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private storage: AngularFireStorage,
    private db: AngularFirestore,
    public projectService: ProjectService
  ) {

    this.crewnieUsers$ = this.db.collection('users');
    this.crewnieUsers$.valueChanges().subscribe(users => {
      this.crewnieUsers = users;
    });

    console.log(this.department);

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
    this.teamLeader.name = user.firstName + " " + user.lastName;
    this.teamLeader.profilePhoto = user.profilePhotoUrl;
    this.teamLeader.position = 'Teamleader';
    this.teamLeader.role = 'admin';

    this.teamLeader.userId = user.uid;

    // this.department.teamLeader = this.teamLeader;
    this.teamLeaderSelected = true;

    this.addTeamLeadForm.setValue({ 'addTeaamLead': '' });
    this.groupChangeEvent();
  }

  public selectTeamMember(value: any) {
    this.addNewMember = false;
    this.addMemberForm.setValue({ 'addMember': '' });
    const user: ActiveUser = this.getMemberById(value);
    const currentUser: DepartmentUser = {
      position: 'actor',
      role: 'member',
      name: user.firstName + ' ' + user.lastName,
      profilePhoto: user.profilePhotoUrl,
      userId: user.uid

    }
    this.users.push(currentUser);
    this.teamMemberSelected = true;

    // this.department.members = this.users;

    let member: DepartmentUser = {};
    member.name = user.firstName + ' ' + user.lastName;
    member.position = 'actor';
    member.role = 'member';
    member.profilePhoto = user.profilePhotoUrl;

    member.userId = user.uid;

    this.teamMembers.push(member);

    this.groupChangeEvent();
  }

  public cancelTeamMember(userId: string) {
    this.users = this.department.members;
    for (var i = 0; i < this.users.length; i++) {
      if (this.users[i].userId == userId)
        this.users.splice(i);
    }
    this.department.members = this.users;
    if (this.department.members.length == 0) {
      this.teamMemberSelected = false;
    }
    this.groupChangeEvent();
  }


  // Get Selected User
  getMemberById(userId: string) {
    return this.crewnieUsers.find(i => i.uid === userId);
  }

  public groupChangeEvent() {

    this.department.title = this.groupData.controls.groupTitle.value;
    this.department.teamLeader = this.teamLeader;
    this.department.members = this.users;

  }



  public deleteGroup() {
    this.departmentReturn.emit(true);
  }

}


