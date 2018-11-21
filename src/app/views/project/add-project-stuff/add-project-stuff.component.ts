import { Component, OnInit } from '@angular/core';
import { Location} from '@angular/common';
import { ProjectService } from 'src/app/core/services/project.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-project-stuff',
  templateUrl: './add-project-stuff.component.html',
  styleUrls: ['./add-project-stuff.component.scss']
})
export class AddProjectStuffComponent implements OnInit {

  constructor(
    public projectService: ProjectService,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit() {
  }


  public nextStep() {
    this.router.navigate(["/projects/new/rentals"]);
  }

  public prevStep() {
    // this.router.navigate(["/projects"]);
    this.location.back();
  }

}
