import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/core/services/project.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-project-roles',
  templateUrl: './project-roles.component.html',
  styleUrls: ['./project-roles.component.scss']
})
export class ProjectRolesComponent implements OnInit {

  castingRightOpen: boolean = false;

  constructor(
    public projectService: ProjectService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
  }

  openRightCastingPanel() {
    this.castingRightOpen = true;
  }
  closeRightCastingPanel() {
    this.castingRightOpen = false;
  }

  public closeProjectDashboard() {
    this.router.navigate(["/projects"]);
  }



}
