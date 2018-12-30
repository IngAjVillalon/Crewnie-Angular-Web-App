import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlankLayoutComponent } from './core/components/blank-layout/blank-layout.component';
import { SidenavLayoutComponent } from './core/components/sidenav-layout/sidenav-layout.component';

// Guards
import { AuthGuard } from './core/services/auth/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'projects', pathMatch: 'full' },
  { path: 'action', redirectTo: 'projects', pathMatch: 'full' },
  { path: 'login', redirectTo: 'sessions/signin', pathMatch: 'full' },
  { path: 'signin', redirectTo: 'sessions/signin', pathMatch: 'full' },
  { path: 'signup', redirectTo: 'sessions/signup', pathMatch: 'full' },
  { path: 'register', redirectTo: 'sessions/signup', pathMatch: 'full' },
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
      {
        path: 'projects',
        loadChildren: './views/project/project.module#ProjectModule',
        canLoad: [ AuthGuard ]
      }
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
