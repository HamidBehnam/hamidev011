import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from './projects.component';
import { ProjectsListComponent } from './projects-list/projects-list.component';
import {ProjectsRoutingModule} from './projects-routing.module';
import {ProjectsStoreModule} from '../../store/projects-store/projects-store.module';
import { ProjectFormComponent } from './project-form/project-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import { ProjectsListItemComponent } from './projects-list-item/projects-list-item.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';


@NgModule({
  declarations: [ProjectsComponent, ProjectsListComponent, ProjectFormComponent, ProjectsListItemComponent, ProjectDetailComponent],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    ProjectsStoreModule,
    ReactiveFormsModule
  ]
})
export class ProjectsModule { }
