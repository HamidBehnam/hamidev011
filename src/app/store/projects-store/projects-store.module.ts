import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {projectsFeatureKey, reducer} from './reducers/projects.reducer';
import {EffectsModule} from '@ngrx/effects';
import {ProjectsEffects} from './effects/projects.effects';
import {ProjectsService} from './services/projects.service';
import {HttpClientModule} from '@angular/common/http';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forFeature(projectsFeatureKey, reducer),
    EffectsModule.forFeature([ProjectsEffects])
  ],
  providers: [
    ProjectsService
  ]
})
export class ProjectsStoreModule { }
