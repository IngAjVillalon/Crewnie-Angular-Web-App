import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { BasicInfoComponent } from './basic-info/basic-info.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonMatsModule } from '../../core/modules/common-mats.module';

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FlexLayoutModule,
    CommonMatsModule
  ],
  declarations: [BasicInfoComponent]
})
export class ProfileModule { }
