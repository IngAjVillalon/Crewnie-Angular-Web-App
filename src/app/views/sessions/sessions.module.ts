import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonMatsModule } from '../../core/modules/common-mats.module'

import { SessionsRoutingModule } from './sessions-routing.module';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    CommonMatsModule,
    SessionsRoutingModule
  ],
  declarations: [SignInComponent, SignUpComponent]
})
export class SessionsModule { }
