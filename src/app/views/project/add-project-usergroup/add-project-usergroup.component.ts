import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from 'src/app/core/services/project.service';
import { userGroup, ActiveUser, groupData, depertment, depertmentObject, Department, DepartmentUser, Project } from 'src/app/core/models/models';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-add-project-usergroup',
  templateUrl: './add-project-usergroup.component.html',
  styleUrls: ['./add-project-usergroup.component.scss']
})
export class AddProjectUsergroupComponent implements OnInit {

  departments: Array<Department> = [];

  constructor(
    public projectService: ProjectService,
    private router: Router,
    private toastr: ToastrService,
  ) {

  }

  ngOnInit() {
    console.log(this.projectService.project);
  }

  public nextStep() {
    // this.router.navigate(["/projects/new/stuffs"]);
    this.previewPageData();
  }

  public prevStep() {
    this.router.navigate(["/projects/new"]);
  }

  public cancelProjectCreate() {
    this.router.navigate(["/projects"]);
  }

  public addUserGroup() {


    var department: Department = {
      projectId: this.projectService.getCurrentProjectId(),
      title: "",
      teamLeader: {},
      members: []
    };
    this.departments.push(department);
    this.projectService.project.departments = this.departments;

    console.log(this.projectService.project.departments);
  }

  getGroupData(event: any, department: Department) {
    // userGroup = event;
    // console.log('In UserGroup: -------------' + event.groupTitle);
    // this.userGroups.forEach(element => {
      // if (element.groupId == event.groupId) {
        // var index = this.userGroups.indexOf(userGroup);
        // this.userGroups[index] = event;
        // element.groupTitle = event.groupTitle;
        // element.members = event.members;
        // element.teamLeader = event.teamLeader;

        // console.log('In element'+element);
        // console.log('In group'+element);
      // }
    // });

    console.log(event);
    console.log(this.departments.indexOf(department));

    var index = this.departments.indexOf(department);
    if(event) {
      this.departments.splice(index, 1);
    }


  }

  public previewPageData() {
    console.log(this.departments);
    this.projectService.addDepartments(this.departments).subscribe((response: Project) => {
      console.log(response._id);
      if(response._id) {

        this.projectService.addAllDepartments(this.departments).subscribe(res => {
          this.router.navigate(["/projects"]);
          this.toastr.success('Departments saved on DB.', 'Success!');
        });

      }else {
        this.toastr.error('Couldnt counnect to server...', 'Error!');
      }

    });

  }

}
