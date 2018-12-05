import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/core/services/project.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { trigger, transition, useAnimation, state } from '@angular/animations';
import { bounce, fadeIn, slideInRight, slideOutRight } from 'ng-animate';

@Component({
  selector: 'app-project-roles',
  templateUrl: './project-roles.component.html',
  styleUrls: ['./project-roles.component.scss'],
  animations: [
    trigger('slideInRight', [
      transition('* => *', useAnimation(slideInRight, {
        params: { timing: 0.3 }
      })),
      transition('* => *', useAnimation(slideOutRight, {
        params: { timing: 0.3 }
      }))
    ]
  )]
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
