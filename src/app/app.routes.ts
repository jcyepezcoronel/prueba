import { Routes } from '@angular/router';
import { UserTableComponent } from './components/user-table/user-table.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/user-table/user-table.component').then(m => m.UserTableComponent)
  }
];