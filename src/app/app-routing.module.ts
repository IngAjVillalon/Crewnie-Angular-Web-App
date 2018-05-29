import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'style',
    loadChildren: './views/style-guide/style-guide.module#StyleGuideModule'
  },
  {
    path: '**',
    redirectTo: 'style'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
