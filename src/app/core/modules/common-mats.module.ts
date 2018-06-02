import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatCardModule,
  MatCheckboxModule
} from '@angular/material';

const matModules = [
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatCardModule,
  MatCheckboxModule
]

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  exports: matModules
})
export class CommonMatsModule { }
