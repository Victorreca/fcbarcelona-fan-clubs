import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'penas-blaugrana',
    loadComponent: () =>
      import('./components/list-fanclubs/list-fanclubs.component').then(
        (m) => m.ListFanclubsComponent
      ),
  },
  {
    path: 'add',
    loadComponent: () =>
      import('./components/add-edit-fanclub/add-edit-fanclub.component').then(
        (m) => m.AddEditFanclubComponent
      ),
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./components/add-edit-fanclub/add-edit-fanclub.component').then(
        (m) => m.AddEditFanclubComponent
      ),
  },
  {
    path: 'mapa',
    loadComponent: () =>
      import('./components/map/map.component').then((m) => m.MapComponent),
  },
  {
    path: 'calendario',
    loadComponent: () =>
      import('./components/calendar/calendar.component').then(
        (m) => m.CalendarComponent
      ),
  },
  {
    path: 'charts',
    loadComponent: () =>
      import('./components/charts/charts.component').then(
        (m) => m.ChartsComponent
      ),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
