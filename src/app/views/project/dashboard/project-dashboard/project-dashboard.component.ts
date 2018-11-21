import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/core/services/project.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-project-dashboard',
  templateUrl: './project-dashboard.component.html',
  styleUrls: ['./project-dashboard.component.scss']
})
export class ProjectDashboardComponent implements OnInit {

  constructor(
    public projectService: ProjectService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {
  }

  ngOnInit() {
  }

  public closeProjectDashboard() {
    this.router.navigate(["/projects"]);
  }


}
