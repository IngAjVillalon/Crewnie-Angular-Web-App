import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { ProjectService } from 'src/app/core/services/project.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss']
})
export class AddProjectComponent implements OnInit {

  public projectInfoForm= new FormGroup({
    projectName: new FormControl(""),
    projectLocation: new FormControl("")
  });

  projectUnions: Array<string> = new Array();

  constructor(
    public projectService: ProjectService,
    private router: Router,
    private location: Location
  ) {
    this.projectUnions.push('adsa');
  }

  ngOnInit() {
    console.log(this.projectService.hero);
  }

  public addNewUnion() {
    this.projectUnions.push('New');
    console.log(this.projectUnions);
  }

  public removeNewUnion() {
    this.projectUnions.pop();
    console.log(this.projectUnions);
  }


  public nextStep() {
    this.projectService.project.projectCover = 'project cover url';
    this.router.navigate(["/projects/new/users"]);
  }

  public prevStep() {
    this.router.navigate(["/projects"]);
  }

  public cancelProjectCreate() {
    this.router.navigate(["/projects"]);
  }

}
