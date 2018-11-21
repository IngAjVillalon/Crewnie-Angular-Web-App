import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/core/services/project.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-project-application',
  templateUrl: './project-application.component.html',
  styleUrls: ['./project-application.component.scss']
})
export class ProjectApplicationComponent implements OnInit {

  constructor(
    public projectService: ProjectService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
  }

  public closeProjectDashboard() {
    this.router.navigate(["/projects"]);
  }
}
