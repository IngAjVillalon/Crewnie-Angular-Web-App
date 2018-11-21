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

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    CommonMatsModule,
    FlexLayoutModule,
    ProjectRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [ProjectsComponent, AddProjectComponent, ProjectCardComponent, AddProjectUsergroupComponent, AddProjectStuffComponent, AddProjectRentalsComponent, UsergroupCardComponent, ProjectDashboardComponent, ProjectApplicationComponent, ProjectStuffComponent, ProjectRolesComponent]
})
export class ProjectModule { }
