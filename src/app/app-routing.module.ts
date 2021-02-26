import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/components/home/home.component';
import * as guards from './guards';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home', 
    pathMatch: 'full' 
  },
  {
    path: 'home',
    component: HomeComponent
  },  
  {
    path: 'tasks',
    loadChildren: () => import('./tasks/tasks.module').then(value => value.TasksModule),
    canLoad: [guards.IdxConnectGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
