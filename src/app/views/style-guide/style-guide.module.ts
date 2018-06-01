import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { 
  MatButtonModule,
  MatIconModule,
  MatInputModule
} from '@angular/material';

import { StyleGuideComponent } from './style-guide.component';
import { stylesRoutes } from './style-guide.routing';
import { CoreModule } from '../../core/core.module';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    FlexLayoutModule,
    RouterModule.forChild(stylesRoutes)
  ],
  declarations: [StyleGuideComponent]
})
export class StyleGuideModule { }
