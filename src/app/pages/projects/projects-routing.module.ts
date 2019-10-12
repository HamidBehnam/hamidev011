import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ProjectsComponent} from './projects.component';
import {ProjectsListComponent} from './projects-list/projects-list.component';

const routes: Routes = [{
  path: '',
  component: ProjectsComponent,
  children: [{
    path: '',
    component: ProjectsListComponent
  }]
}];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
