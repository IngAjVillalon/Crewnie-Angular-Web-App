import { Component, OnInit, Input } from '@angular/core';
import { ActiveUser, userGroup, userGroupUser } from 'src/app/core/models/models';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormControl, FormGroup } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';


@Component({
  selector: 'usergroup-card',
  templateUrl: './usergroup-card.component.html',
  styleUrls: ['./usergroup-card.component.scss']
})
export class UsergroupCardComponent implements OnInit {
  users: Array<userGroupUser> = [];
  user: userGroupUser;
  teamLeader: userGroupUser = <userGroupUser>{};
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



  myControl = new FormControl();
  addMember = new FormControl();
  options: ActiveUser[] = [];
  filteredOptions: ActiveUser[];

  @Input('userGroup') userGroup: userGroup;

  constructor(
    private storage: AngularFireStorage,
    private db: AngularFirestore
  ) {

    this.crewnieUsers$ = this.db.collection('users');
    this.crewnieUsers$.valueChanges().subscribe(users => {
      this.crewnieUsers = users;
    });

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
  }

  public selectTeamLeader(userId: string) {
    this.isAdminSelected = false;
  }

  public selectTeamLead(value: any) {
    this.isAdminSelected = true;
    this.teamLeader.userRole = 'admin'
    this.teamLeader.userPosition = 'Team Lead';
    this.teamLeader.user = this.getMemberById(value);
    console.log(this.teamLeader);
    console.log(value);
    this.addTeamLeadForm.setValue({ 'addTeaamLead': '' });
  }

  public selectTeamMember(value: any) {
    // this.crewnieUser =
    this.addNewMember = false;
    this.addMemberForm.setValue({ 'addMember': '' });
    const user: userGroupUser = {
      user: this.getMemberById(value),
      userPosition: 'Admin',
      userRole: 'actor'
    }
    this.users.push(user);
    this.userGroup.groupUsers = this.users;
    console.log(this.userGroup.groupUsers);
  }

  public cancelTeamMember(userId: string) {
    // const memberIndex = this.users.findIndex(this.getMemberById(userId));
    this.users = this.userGroup.groupUsers;
    // this.users = this.users.filter(function (obj) {
    //   return obj.user.uid == userId;
    // });
    for(var i=0 ; i<this.users.length; i++)
    {
        if(this.users[i].user.uid==userId)
        this.users.splice(i);
    }

    this.userGroup.groupUsers = this.users;

    console.log(this.users);
    console.log(userId);
  }

  // Get Selected User

  getMemberById(userId: string) {
    return this.crewnieUsers.find(i => i.uid === userId);
  }

}
