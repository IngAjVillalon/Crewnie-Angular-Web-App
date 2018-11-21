import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from 'src/app/core/services/project.service';
import { userGroup } from 'src/app/core/models/models';


@Component({
  selector: 'app-add-project-usergroup',
  templateUrl: './add-project-usergroup.component.html',
  styleUrls: ['./add-project-usergroup.component.scss']
})
export class AddProjectUsergroupComponent implements OnInit {

  userGroups: Array<userGroup> = [];

  constructor(
    public projectService: ProjectService,
    private router: Router
  ) {

  }

  ngOnInit() {
    console.log(this.projectService.project);
  }

  public nextStep() {
    this.router.navigate(["/projects"]);
  }

  public prevStep() {
    this.router.navigate(["/projects/new"]);
  }

  public cancelProjectCreate() {
    this.router.navigate(["/projects"]);
  }

  public addUserGroup() {
    this.userGroups.push({});
  }

}
