import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatSidenavHelperDirective } from './directives/mat-sidebar/mat-sidenav.directive';
// import { MatSidebarHelperService } from './directives/mat-sidebar/mat-sidenav.service';

const declarations = [
  MatSidenavHelperDirective
]

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: declarations,
  exports: declarations
})
export class CoreModule { }
