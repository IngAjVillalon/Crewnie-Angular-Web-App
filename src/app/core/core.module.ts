import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { MatSidenavHelperDirective } from './directives/mat-sidebar/mat-sidenav.directive';
// import { MatSidebarHelperService } from './directives/mat-sidebar/mat-sidenav.service';

const declarations = [
  MatSidenavHelperDirective
]

@NgModule({
  imports: [
    CommonModule,
    // SweetAlert2Module.forRoot({
    //     buttonsStyling: false,
    //     customClass: 'modal-content',
    //     confirmButtonClass: 'mat-flat-button',
    //     cancelButtonClass: 'btn'
    // })
  
  ],
  declarations: declarations,
  exports: declarations
})
export class CoreModule { }
