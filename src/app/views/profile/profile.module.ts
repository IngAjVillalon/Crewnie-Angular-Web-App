import { PdfViewerModule } from 'ng2-pdf-viewer';
import { DropZoneDirective } from './../../core/directives/drop-zone.directive';
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
import { AddScriptPortfolioComponent } from './add-script-portfolio/add-script-portfolio.component';
import { AddVideoPortfolioComponent } from './add-video-portfolio/add-video-portfolio.component';
import { AddAudioPortfolioComponent } from './add-audio-portfolio/add-audio-portfolio.component';
import { UpdateImagePortfolioComponent } from './update-image-portfolio/update-image-portfolio.component';
import { UpdateScriptPortfolioComponent } from './update-script-portfolio/update-script-portfolio.component';
import { UpdateAudioPortfolioComponent } from './update-audio-portfolio/update-audio-portfolio.component';
import { UpdateVideoPortfolioComponent } from './update-video-portfolio/update-video-portfolio.component';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    ProfileRoutingModule,
    FlexLayoutModule,
    CommonMatsModule,
    FormsModule,
    ReactiveFormsModule,
    PdfViewerModule
  ],
  declarations: [BasicInfoComponent, PortfolioComponent, AddImagePortfolioComponent, ViewImagePortfolioComponent, ViewVideoPortfolioComponent, ViewAudioPortfolioComponent, ViewScriptPortfolioComponent, DropZoneDirective, AddScriptPortfolioComponent, AddVideoPortfolioComponent, AddAudioPortfolioComponent, UpdateImagePortfolioComponent, UpdateScriptPortfolioComponent, UpdateAudioPortfolioComponent, UpdateVideoPortfolioComponent]
})
export class ProfileModule { }
