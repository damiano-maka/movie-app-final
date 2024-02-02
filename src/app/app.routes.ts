import { Routes } from '@angular/router';
import { authGuardFn } from '@auth0/auth0-angular';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () => import('./features/home.component'),
    children: [
      { path: '', redirectTo: 'movies', pathMatch: 'full' },
      {
        path: 'movies',
        loadComponent: () => import('./features/movie-page.component'),
      },
      {
        path: 'series',
        loadComponent: () => import('./features/series-page.component'),
      },
    ],
  },
  {
    path: 'm/:id',
    loadComponent: () => import('./features/movie-details.component'),
    canActivate: [authGuardFn],
  },
  {
    path: 's/:id',
    loadComponent: () => import('./features/series-details.component'),
    canActivate: [authGuardFn],
  },
  {
    path: 'profile',
    loadComponent: () => import('./features/profile.component'),
    canActivate: [authGuardFn],
  },
  {
    path: 'search',
    loadComponent: () => import('./features/search.component'),
    canActivate: [authGuardFn],
  },
  {
    path: 'mylist',
    loadComponent: () => import('./features/mylist.component'),
    canActivate: [authGuardFn],
  },
  {
    path: 'player/:id',
    loadComponent: () => import('./features/player.component'),
    canActivate: [authGuardFn],
  },
  {
    path: 'players/:id',
    loadComponent: () => import('./features/playerSeries.component'),
    canActivate: [authGuardFn],
  },
  { path: '**', loadComponent: () => import('./core/error.component') },
];
