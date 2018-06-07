import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SetupStepperComponent } from './setup-stepper/setup-stepper.component';

const routes: Routes = [
  {
    path: '',
    component: SetupStepperComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileSetupRoutingModule { }
