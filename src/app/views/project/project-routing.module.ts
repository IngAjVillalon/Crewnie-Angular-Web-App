import { AddProjectComponent } from './add-project/add-project.component';
import { ProjectsComponent } from './projects/projects.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddProjectUsergroupComponent } from './add-project-usergroup/add-project-usergroup.component';
import { AddProjectStuffComponent } from './add-project-stuff/add-project-stuff.component';
import { AddProjectRentalsComponent } from './add-project-rentals/add-project-rentals.component';
import { ProjectDashboardComponent } from './dashboard/project-dashboard/project-dashboard.component';
import { ProjectRolesComponent } from './dashboard/project-roles/project-roles.component';
import { ProjectApplicationComponent } from './dashboard/project-application/project-application.component';
import { ApplicantManagemantComponent } from './dashboard/applicant-management/applicant-managemant/applicant-managemant.component';
import { ApplicantTransferComponent } from './dashboard/applicant-management/applicant-transfer/applicant-transfer.component';
import { CastingCallComponent } from './dashboard/applicant-management/casting-call/casting-call/casting-call.component';
import { CastingCalendarComponent } from './dashboard/applicant-management/casting-call/casting-calendar/casting-calendar.component';
import { CastingInfoComponent } from './dashboard/applicant-management/casting-call/casting-info/casting-info.component';
import { ProjectStuffComponent } from './dashboard/project-stuff/project-stuff.component';

const routes: Routes = [

  {
    path: '',
    component: ProjectsComponent,
    data: {depth: 1}
  },
  {
    path: 'new',
    component: AddProjectComponent,
    data: {depth: 2}
  },
  {
    path: 'new/users',
    component: AddProjectUsergroupComponent,
    data: {depth: 3}
  },
  {
    path: 'new/stuffs',
    component: AddProjectStuffComponent,
    data: {depth: 4}
  },
  {
    path: 'new/rentals',
    component: AddProjectRentalsComponent,
    data: {depth: 5}
  },
  {
    path: 'dashboard',
    component: ProjectDashboardComponent,
    data: {depth: 6}
  },
  {
    path: 'dashboard/application',
    component: ProjectApplicationComponent,
    data: {depth: 7}
  },
  {
    path: 'dashboard/application/stuffs',
    component: ProjectStuffComponent,
    data: {depth: 3}
  },
  {
    path: 'dashboard/roles',
    component: ProjectRolesComponent,
    data: {depth: 8}
  },
  {
    path: 'dashboard/applicant/management',
    component: ApplicantManagemantComponent,
    data: {depth: 9}
  },
  {
    path: 'dashboard/applicant/management/transfer',
    component: ApplicantTransferComponent,
    data: {depth: 10}
  },
  {
    path: 'dashboard/applicant/casting/call',
    component: CastingCallComponent,
    data: {depth: 11}
  },
  {
    path: 'dashboard/applicant/casting/calendar',
    component: CastingCalendarComponent,
    data: {depth: 12}
  },
  {
    path: 'dashboard/applicant/casting/info',
    component: CastingInfoComponent,
    data: {depth: 13}
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
