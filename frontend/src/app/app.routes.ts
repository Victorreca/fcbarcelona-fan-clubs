import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MapComponent } from './components/map/map.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { ChartsComponent } from './components/charts/charts.component';
import { AddEditFanclubComponent } from './components/add-edit-fanclub/add-edit-fanclub.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'add', component: AddEditFanclubComponent },
  { path: 'edit/:id', component: AddEditFanclubComponent },
  { path: 'mapa', component: MapComponent },
  { path: 'calendario', component: CalendarComponent },
  { path: 'charts', component: ChartsComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
