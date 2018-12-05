import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ProjectService } from 'src/app/core/services/project.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-casting-call',
  templateUrl: './casting-call.component.html',
  styleUrls: ['./casting-call.component.scss']
})
export class CastingCallComponent implements OnInit {

  sliderValue: number = 15;
  constructor(
    public projectService: ProjectService,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(

  ) {
  }

  public nextPage() {
    this.router.navigate(["/projects/dashboard/applicant/casting/calendar"]);
  }

  public interviewTimeChange(event: any) {
    this.sliderValue = event.value;
  }

}
