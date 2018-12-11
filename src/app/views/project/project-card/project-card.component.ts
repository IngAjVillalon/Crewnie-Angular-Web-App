import { Component, OnInit, Input } from '@angular/core';
import { Project } from 'src/app/core/models/models';
import { ProjectService } from 'src/app/core/services/project.service';
import { Router } from '@angular/router';



@Component({
  selector: 'project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent implements OnInit {

  @Input('project') project: Project;

  constructor(
    public projectService: ProjectService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  public viewProjectDashboard(projectId: string) {
    this.projectService.setCurrentProjectId(this.project._id);
    this.router.navigate(["/projects/dashboard"]);
  }

  public editProject() {

  }

}
