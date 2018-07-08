import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlankLayoutComponent } from './core/components/blank-layout/blank-layout.component';
import { SidenavLayoutComponent } from './core/components/sidenav-layout/sidenav-layout.component';

const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'sessions/signin', 
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
        path: 'sessions',
        loadChildren: './views/sessions/sessions.module#SessionsModule'
      },
      {
        path: 'profile-setup',
        loadChildren: './views/profile-setup/profile-setup.module#ProfileSetupModule'
      },
    ]
  },
  {
    path: '',
    component: SidenavLayoutComponent,
    children: [
      {
        path: 'profile',
        loadChildren: './views/profile/profile.module#ProfileModule'
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'sessions/404'
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
