import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/core/services/project.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-casting-calendar',
  templateUrl: './casting-calendar.component.html',
  styleUrls: ['./casting-calendar.component.scss']
})
export class CastingCalendarComponent implements OnInit {

  constructor(
    public projectService: ProjectService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  public cancelSchedule() {
    this.router.navigate(["/projects/dashboard/applicant/casting/call"]);
  }

  public nextPage() {
    this.router.navigate(["/projects/dashboard/applicant/casting/info"]);
  }

}
