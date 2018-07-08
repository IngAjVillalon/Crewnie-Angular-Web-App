import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSidenavHelperDirective, MatSidenavTogglerDirective } from './directives/mat-sidebar/mat-sidenav.directive';


import { BlankLayoutComponent } from './components/blank-layout/blank-layout.component';
import { SidenavLayoutComponent } from './components/sidenav-layout/sidenav-layout.component';
import { CommonMatsModule } from './modules/common-mats.module';

const declarations = [
  BlankLayoutComponent,
  SidenavLayoutComponent,
  MatSidenavHelperDirective,
  MatSidenavTogglerDirective
]

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    CommonMatsModule,
    RouterModule
  ],
  declarations: declarations,
  exports: declarations
})
export class CoreModule { }
