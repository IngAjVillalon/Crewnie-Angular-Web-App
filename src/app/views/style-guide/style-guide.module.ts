import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

import { 
  MatButtonModule,
  MatIconModule
} from '@angular/material';


import { StyleGuideComponent } from './style-guide.component';
import { stylesRoutes } from './style-guide.routing';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule,
    RouterModule.forChild(stylesRoutes)
  ],
  declarations: [StyleGuideComponent]
})
export class StyleGuideModule { }
