import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  {
    path: 'register',
    loadComponent: () =>
      import('./register/register.page').then((m) => m.RegisterPage),
  },
  {
    path: '',
    redirectTo: 'register',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'car',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./car/car.page').then((m) => m.CarPage),
      },
      {
        path: 'new',
        loadComponent: () =>
          import('./car/car-creation/car-creation.page').then((m) => m.NewCarPage),
      },
      {
        path: ':plate',
        loadComponent: () =>
          import('./car/car-detail/car-detail.page').then(
            (m) => m.CarDetailPage
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'register',
    pathMatch: 'full',
  },
];
