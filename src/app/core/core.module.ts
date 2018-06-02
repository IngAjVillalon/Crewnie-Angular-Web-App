import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSidenavHelperDirective } from './directives/mat-sidebar/mat-sidenav.directive';


import { BlankLayoutComponent } from './components/blank-layout/blank-layout.component';

const declarations = [
  BlankLayoutComponent,
  MatSidenavHelperDirective
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: declarations,
  exports: declarations
})
export class CoreModule { }
