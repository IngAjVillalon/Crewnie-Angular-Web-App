import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/core/services/project.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { responsibles, Project, Department, DepartmentUser } from 'src/app/core/models/models';


@Component({
  selector: 'app-project-dashboard',
  templateUrl: './project-dashboard.component.html',
  styleUrls: ['./project-dashboard.component.scss']
})
export class ProjectDashboardComponent implements OnInit {

  project: Project = {};
  departments: Department[];
  responsibles$: AngularFirestoreCollection<responsibles>;
  responsibles: Array<DepartmentUser> = [];

  constructor(
    public projectService: ProjectService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {
    // this.responsibles$ = projectService.getProjectResponsibles('F5nYbyrl6QPZgNAChGsR');
    //     this.responsibles$.valueChanges().subscribe(responsibles => {
    //       this.responsibles = responsibles;
    //     });

    this.projectService.getProjectById(this.projectService.getCurrentProjectId()).subscribe(response => {
      this.project = response;
      console.log(this.project.departments);
      this.getResponsibles();
    })
  }

  ngOnInit() {
  }

  public closeProjectDashboard() {
    this.router.navigate(["/projects"]);
  }

  private getResponsibles() {
    this.departments = this.project.departments;


    this.departments.forEach(department => {
      let member: DepartmentUser = {};
      member = department.teamLeader;
      this.responsibles.push(member);

      department.members.forEach(element => {
        this.responsibles.push(element);
      });

    });

    console.log(this.responsibles);

  }

  public editResponsibles() {
    this.router.navigate(["/projects/responsibles/edit"]);
  }

  public removeResponsibles(id:string) {

  }

}
