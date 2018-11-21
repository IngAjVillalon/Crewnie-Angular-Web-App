import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/core/services/project.service';
import { projectItem } from 'src/app/core/models/models';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { UserService } from 'src/app/core/services/user.service';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(1000, style({ opacity: 1 }))
      ])
    ])
  ]
})
export class ProjectsComponent implements OnInit {

  userId: string;
  projects$: AngularFirestoreCollection<projectItem>;
  projects: projectItem[];

  constructor(
    public userService: UserService,
    public projectService: ProjectService,
    private router: Router
  ) {
    this.userId = this.userService.getUserId();
    this.projects$ = this.projectService.getProject(this.userId);
    this.projects$.valueChanges().subscribe(projects => {
      this.projects = projects;
    });
  }

  ngOnInit() {
  }



  addNewProject() {
    console.log('add new project');
    this.projectService.hero = 'project service data';
    this.projectService.project.prijectTitle = 'New Project Title';
    this.router.navigate(["/projects/new"]);
  }

}
