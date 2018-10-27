import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../../core/core.module';


import { ProfileRoutingModule } from './profile-routing.module';
import { BasicInfoComponent } from './basic-info/basic-info.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonMatsModule } from '../../core/modules/common-mats.module';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { AddImagePortfolioComponent } from './add-image-portfolio/add-image-portfolio.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ViewImagePortfolioComponent } from './view-image-portfolio/view-image-portfolio.component';
import { ViewVideoPortfolioComponent } from './view-video-portfolio/view-video-portfolio.component';
import { ViewAudioPortfolioComponent } from './view-audio-portfolio/view-audio-portfolio.component';
import { ViewScriptPortfolioComponent } from './view-script-portfolio/view-script-portfolio.component';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    ProfileRoutingModule,
    FlexLayoutModule,
    CommonMatsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [BasicInfoComponent, PortfolioComponent, AddImagePortfolioComponent, ViewImagePortfolioComponent, ViewVideoPortfolioComponent, ViewAudioPortfolioComponent, ViewScriptPortfolioComponent]
})
export class ProfileModule { }
