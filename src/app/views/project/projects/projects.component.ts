import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/core/services/project.service';
import { projectItem, Project } from 'src/app/core/models/models';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { UserService } from 'src/app/core/services/user.service';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { HttpClient } from '@angular/common/http';


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
  projects2: Project[];

  constructor(
    public userService: UserService,
    public projectService: ProjectService,
    private router: Router,
    private http: HttpClient
  ) {
    this.userId = this.userService.getUserId();
    this.projects$ = this.projectService.getProject(this.userId);
    this.projects$.valueChanges().subscribe(projects => {
      this.projects = projects;
    });

    var url = "https://crewnie.herokuapp.com/api/projects/creator/" + this.userId;
    this.http.get<Project[]>(url).subscribe(responseData => {

      this.projects2 = responseData;
      console.log(this.projects2[0].createdAt);
    });


    // console.log('Print:' + this.http.get('https://crewnie.herokuapp.com/api/projects/')); // will get 'Print: + [object object] because this is not the data that has returned but an observable object.'
  }

  ngOnInit() {
  }



  addNewProject() {
    console.log('add new project');
    this.projectService.hero = 'project service data';
    this.router.navigate(["/projects/new"]);
  }

}
