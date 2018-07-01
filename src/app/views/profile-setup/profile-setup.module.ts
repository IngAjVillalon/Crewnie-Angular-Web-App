import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonMatsModule } from '../../core/modules/common-mats.module';

import { ProfileSetupRoutingModule } from './profile-setup-routing.module';
import { SetupStepperComponent } from './setup-stepper/setup-stepper.component';
import { CoverPhotoDialogComponent } from './cover-photo-dialog/cover-photo-dialog.component';
import { CoverLetterDialogComponent } from './cover-letter-dialog/cover-letter-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    CommonMatsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    ProfileSetupRoutingModule
  ],
  declarations: [SetupStepperComponent, CoverPhotoDialogComponent, CoverLetterDialogComponent],
  entryComponents: [CoverPhotoDialogComponent, CoverLetterDialogComponent]
})
export class ProfileSetupModule { }
