import { Injectable } from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {LoadProjectsAction, LoadProjectsSuccessAction, ProjectsActionTypes} from '../actions/projects.actions';
import {map, switchMap} from 'rxjs/operators';
import {ProjectsService} from '../services/projects.service';
import {Project} from '../models/project';



@Injectable()
export class ProjectsEffects {
  constructor(private actions$: Actions, private projectsService: ProjectsService) {}

  @Effect()
  loadProjectsAction$ = this.actions$.pipe(
    ofType(ProjectsActionTypes.LoadProjects),
    switchMap((action: LoadProjectsAction) =>
      this.projectsService.loadProjects()
        .pipe(
          map((projects: Project[]) => new LoadProjectsSuccessAction(projects))
    ))
  );

}
