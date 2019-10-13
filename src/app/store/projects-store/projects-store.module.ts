import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {projectsFeatureKey, reducer} from './reducers/projects.reducer';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(projectsFeatureKey, reducer),
  ]
})
export class ProjectsStoreModule { }
