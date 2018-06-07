import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatCardModule,
  MatCheckboxModule,
  MatStepperModule,
  MatSelectModule
} from '@angular/material';

const matModules = [
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatCardModule,
  MatCheckboxModule,
  MatStepperModule,
  MatSelectModule
]

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  exports: matModules
})
export class CommonMatsModule { }
