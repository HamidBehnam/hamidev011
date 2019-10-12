import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from './projects.component';
import { ProjectsListComponent } from './projects-list/projects-list.component';
import {ProjectsRoutingModule} from './projects-routing.module';



@NgModule({
  declarations: [ProjectsComponent, ProjectsListComponent],
  imports: [
    CommonModule,
    ProjectsRoutingModule
  ]
})
export class ProjectsModule { }
