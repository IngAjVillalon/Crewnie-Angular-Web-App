import { UpdateScriptPortfolioComponent } from './update-script-portfolio/update-script-portfolio.component';
import { UpdateImagePortfolioComponent } from './update-image-portfolio/update-image-portfolio.component';
import { AddAudioPortfolioComponent } from './add-audio-portfolio/add-audio-portfolio.component';
import { AddVideoPortfolioComponent } from './add-video-portfolio/add-video-portfolio.component';
import { AddScriptPortfolioComponent } from './add-script-portfolio/add-script-portfolio.component';
import { ViewAudioPortfolioComponent } from './view-audio-portfolio/view-audio-portfolio.component';
import { ViewScriptPortfolioComponent } from './view-script-portfolio/view-script-portfolio.component';
import { ViewVideoPortfolioComponent } from './view-video-portfolio/view-video-portfolio.component';
import { AddImagePortfolioComponent } from './add-image-portfolio/add-image-portfolio.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasicInfoComponent } from './basic-info/basic-info.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { ViewImagePortfolioComponent } from './view-image-portfolio/view-image-portfolio.component';
import { UpdateAudioPortfolioComponent } from './update-audio-portfolio/update-audio-portfolio.component';
import { UpdateVideoPortfolioComponent } from './update-video-portfolio/update-video-portfolio.component';



const routes: Routes = [

  {
    path: '',
    component: BasicInfoComponent
  },
  {
    path: 'info',
    component: BasicInfoComponent
  },
  {
    path: 'portfolio',
    component: PortfolioComponent
  },
  {
    path: 'portfolio/image',
    component: ViewImagePortfolioComponent
  },
  {
    path: 'portfolio/video',
    component: ViewVideoPortfolioComponent
  },
  {
    path: 'portfolio/audio',
    component: ViewAudioPortfolioComponent
  },
  {
    path: 'portfolio/script',
    component: ViewScriptPortfolioComponent
  },
  {
    path: 'portfolio/add/image',
    component: AddImagePortfolioComponent
  },
  {
    path: 'portfolio/add/video',
    component: AddVideoPortfolioComponent
  },
  {
    path: 'portfolio/add/audio',
    component: AddAudioPortfolioComponent
  },
  {
    path: 'portfolio/add/script',
    component: AddScriptPortfolioComponent
  },
  {
    path: 'portfolio/update/image',
    component: UpdateImagePortfolioComponent
  },
  {
    path: 'portfolio/update/audio',
    component: UpdateAudioPortfolioComponent
  },
  {
    path: 'portfolio/update/video',
    component: UpdateVideoPortfolioComponent
  },
  {
    path: 'portfolio/update/script',
    component: UpdateScriptPortfolioComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
