import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasicInfoComponent } from './basic-info/basic-info.component';

const routes: Routes = [
  {
    path: '',
    component: BasicInfoComponent
  },
  {
    path: '/portfolio',
    component: BasicInfoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
