import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/core/services/project.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { responsibles } from 'src/app/core/models/models';


@Component({
  selector: 'app-project-dashboard',
  templateUrl: './project-dashboard.component.html',
  styleUrls: ['./project-dashboard.component.scss']
})
export class ProjectDashboardComponent implements OnInit {


  responsibles$: AngularFirestoreCollection<responsibles>;
  responsibles: responsibles[];

  constructor(
    public projectService: ProjectService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {
    this.responsibles$ = projectService.getProjectResponsibles('F5nYbyrl6QPZgNAChGsR');
        this.responsibles$.valueChanges().subscribe(responsibles => {
          this.responsibles = responsibles;
        });
  }

  ngOnInit() {
  }

  public closeProjectDashboard() {
    this.router.navigate(["/projects"]);
  }

  public editResponsibles() {
    this.router.navigate(["/projects/responsibles/edit"]);
  }

  public removeResponsibles(id:string) {

  }

}
