import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {PagesComponent} from './pages.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [{
    path: 'projects',
    loadChildren: () => import('./projects/projects.module').then(module => module.ProjectsModule)
  }]
}];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class PagesRoutingModule { }
