import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatCardModule,
  MatCheckboxModule,
  MatStepperModule,
  MatSelectModule,
  MatDatepickerModule,
  MatDialogModule,
  MatNativeDateModule,
  MatAutocompleteModule,
  MatDividerModule,
  MatSidenavModule,
  MatListModule,
  MatChipsModule,
  MatMenuModule,
  MatButtonToggleModule,
  MatFormFieldModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatSnackBarModule,
  MatTabsModule,
  MatExpansionModule
} from '@angular/material';

const matModules = [
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatCardModule,
  MatCheckboxModule,
  MatStepperModule,
  MatSelectModule,
  MatDatepickerModule,
  MatDialogModule,
  MatNativeDateModule,
  MatAutocompleteModule,
  MatDividerModule,
  MatSidenavModule,
  MatListModule,
  MatChipsModule,
  MatMenuModule,
  MatButtonToggleModule,
  MatFormFieldModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatSnackBarModule,
  MatTabsModule,
  MatExpansionModule
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  exports: matModules
})
export class CommonMatsModule { }
