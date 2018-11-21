import { Component, OnInit, Input } from '@angular/core';
import { projectItem } from 'src/app/core/models/models';
import { ProjectService } from 'src/app/core/services/project.service';
import { Router } from '@angular/router';

@Component({
  selector: 'project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent implements OnInit {

  @Input('project') project: projectItem;

  constructor(
    public projectService: ProjectService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  public viewProjectDashboard(projectId: string) {
    this.router.navigate(["/projects/dashboard"]);
  }

}
