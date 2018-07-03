import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonMatsModule } from '../../core/modules/common-mats.module'

import { SessionsRoutingModule } from './sessions-routing.module';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { EmailVerifyDialogComponent } from './email-verify-dialog/email-verify-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    CommonMatsModule,
    SessionsRoutingModule
  ],
  declarations: [SignInComponent, 
    SignUpComponent, VerifyEmailComponent, 
    ForgotPasswordComponent, NotFoundComponent, 
    EmailVerifyDialogComponent],
    entryComponents: [ EmailVerifyDialogComponent ]
})
export class SessionsModule { }
