import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonMatsModule } from '../../core/modules/common-mats.module';

import { ProfileSetupRoutingModule } from './profile-setup-routing.module';
import { SetupStepperComponent } from './setup-stepper/setup-stepper.component';

@NgModule({
  imports: [
    CommonModule,
    CommonMatsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    ProfileSetupRoutingModule
  ],
  declarations: [SetupStepperComponent]
})
export class ProfileSetupModule { }
