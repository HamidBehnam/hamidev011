import { Injectable } from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {LoadProjectsAction, LoadProjectsSuccessAction, ProjectsActionTypes} from '../actions/projects.actions';
import {map, switchMap} from 'rxjs/operators';
import {ProjectsService} from '../services/projects.service';
import {Project} from '../models/project';
import {ProjectsServiceType} from '../models/projects-service-type';

const projectsServiceCore = Symbol();

@Injectable()
export class ProjectsEffects {
  [projectsServiceCore]: ProjectsServiceType;

  constructor(private actions$: Actions, projectsService: ProjectsService) {
    setTimeout(() => {
      this[projectsServiceCore] = projectsService.getService(Symbol());
    }, 5000);
  }

  @Effect()
  loadProjectsAction$ = this.actions$.pipe(
    ofType(ProjectsActionTypes.LoadProjects),
    switchMap((action: LoadProjectsAction) =>
      this[projectsServiceCore].loadProjects()
        .pipe(
          map((projects: Project[]) => new LoadProjectsSuccessAction(projects))
    ))
  );

}
