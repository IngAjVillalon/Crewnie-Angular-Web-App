import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../../core/core.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjectsComponent } from './projects/projects.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { CommonMatsModule } from 'src/app/core/modules/common-mats.module';
import { ProjectCardComponent } from './project-card/project-card.component';
import { AddProjectUsergroupComponent } from './add-project-usergroup/add-project-usergroup.component';
import { AddProjectStuffComponent } from './add-project-stuff/add-project-stuff.component';
import { AddProjectRentalsComponent } from './add-project-rentals/add-project-rentals.component';
import { UsergroupCardComponent } from './usergroup-card/usergroup-card.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProjectDashboardComponent } from './dashboard/project-dashboard/project-dashboard.component';
import { ProjectApplicationComponent } from './dashboard/project-application/project-application.component';
import { ProjectStuffComponent } from './dashboard/project-stuff/project-stuff.component';
import { ProjectRolesComponent } from './dashboard/project-roles/project-roles.component';
import { PositionCardComponent } from './add-project-stuff/position-card/position-card.component';
import { ApplicantManagemantComponent } from './dashboard/applicant-management/applicant-managemant/applicant-managemant.component';
import { ApplicantTransferComponent } from './dashboard/applicant-management/applicant-transfer/applicant-transfer.component';
import { CastingCallComponent } from './dashboard/applicant-management/casting-call/casting-call/casting-call.component';
import { CastingCalendarComponent } from './dashboard/applicant-management/casting-call/casting-calendar/casting-calendar.component';
import { CastingInfoComponent } from './dashboard/applicant-management/casting-call/casting-info/casting-info.component';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    CommonMatsModule,
    FlexLayoutModule,
    ProjectRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ],
  declarations: [ProjectsComponent, AddProjectComponent, ProjectCardComponent, AddProjectUsergroupComponent, AddProjectStuffComponent, AddProjectRentalsComponent, UsergroupCardComponent, ProjectDashboardComponent, ProjectApplicationComponent, ProjectStuffComponent, ProjectRolesComponent, PositionCardComponent, ApplicantManagemantComponent, ApplicantTransferComponent, CastingCallComponent, CastingCalendarComponent, CastingInfoComponent]
})
export class ProjectModule { }
