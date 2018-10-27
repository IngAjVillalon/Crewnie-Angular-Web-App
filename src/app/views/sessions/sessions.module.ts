import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonMatsModule } from '../../core/modules/common-mats.module'

import { SessionsRoutingModule } from './sessions-routing.module';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { EmailVerifyDialogComponent } from './email-verify-dialog/email-verify-dialog.component';
import { ForgotDialogComponent } from './forgot-dialog/forgot-dialog.component';
import { PasswordStrengthBarModule } from 'ng2-password-strength-bar';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CommonMatsModule,
    SessionsRoutingModule,
    PasswordStrengthBarModule
  ],
  declarations: [
    SignInComponent,
    SignUpComponent,
    VerifyEmailComponent,
    NotFoundComponent,
    EmailVerifyDialogComponent,
    ForgotDialogComponent

  ],
  entryComponents: [ EmailVerifyDialogComponent, ForgotDialogComponent ]
})
export class SessionsModule { }
