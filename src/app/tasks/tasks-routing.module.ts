import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import * as fromContainers from './containers';

import * as guards from '../guards';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'full',
  },

  {
    path: 'tasks',
    component: fromContainers.ListDisplayComponent,
    canActivate: [guards.IdxConnectGuard],
  }

];


@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class TasksRoutingModule { }
