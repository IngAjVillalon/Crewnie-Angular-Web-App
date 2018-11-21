import { Component, OnInit } from '@angular/core';
import { Location} from '@angular/common';
import { ProjectService } from 'src/app/core/services/project.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-project-rentals',
  templateUrl: './add-project-rentals.component.html',
  styleUrls: ['./add-project-rentals.component.scss']
})
export class AddProjectRentalsComponent implements OnInit {

  constructor(
    public projectService: ProjectService,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit() {
  }

  public nextStep() {
    this.router.navigate(["/projects"]);
  }

  public prevStep() {
    // this.router.navigate(["/projects"]);
    this.location.back();
  }

}
