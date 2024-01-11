import { Routes } from '@angular/router';
import { authGuardFn } from '@auth0/auth0-angular';

export const routes: Routes = [
    { path: 'home', loadComponent: () => import('./features/home.component')},
    {
      path: 'profile',
      loadComponent: () => import('./features/profile.component'),
      canActivate: [authGuardFn] ,
    },
  
    { path: '', redirectTo: 'home', pathMatch: 'full' }
];
