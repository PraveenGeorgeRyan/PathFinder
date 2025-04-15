import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProgramListComponent } from './components/program-list/program-list.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: ':city', component: ProgramListComponent },
  { path: ':city/:program', component: ProgramListComponent },
  { path: ':city/:program/:category', component: ProgramListComponent },
  { path: '**', redirectTo: 'not-found' }
];
