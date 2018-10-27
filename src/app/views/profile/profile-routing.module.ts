import { ViewAudioPortfolioComponent } from './view-audio-portfolio/view-audio-portfolio.component';
import { ViewScriptPortfolioComponent } from './view-script-portfolio/view-script-portfolio.component';
import { ViewVideoPortfolioComponent } from './view-video-portfolio/view-video-portfolio.component';
import { AddImagePortfolioComponent } from './add-image-portfolio/add-image-portfolio.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasicInfoComponent } from './basic-info/basic-info.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { ViewImagePortfolioComponent } from './view-image-portfolio/view-image-portfolio.component';



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
    path: 'portfolio/add/image',
    component: AddImagePortfolioComponent
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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
