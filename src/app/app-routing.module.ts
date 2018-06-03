import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlankLayoutComponent } from './core/components/blank-layout/blank-layout.component';

const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'session/signin', 
    pathMatch: 'full' 
  },
  {
    path: 'style',
    loadChildren: './views/style-guide/style-guide.module#StyleGuideModule'
  },
  {
    path: '',
    component: BlankLayoutComponent,
    children: [
      {
        path: 'session',
        loadChildren: './views/sessions/sessions.module#SessionsModule'
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'session/404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
