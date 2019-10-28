import { Injectable } from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {
  LoadProjectsAction,
  LoadProjectsSuccessAction,
  LoadProjectAction,
  ProjectsActionTypes,
  LoadProjectSuccessAction,
  UpdateProjectAction,
  UpdateProjectSuccessAction,
  CreateProjectAction,
  CreateProjectSuccessAction, DeleteProjectAction, DeleteProjectSuccessAction
} from '../actions/projects.actions';
import {map, switchMap} from 'rxjs/operators';
import {ProjectsService} from '../services/projects.service';
import {Project} from '../models/project';
import {ProjectsFacadeService} from "../services/projects-facade.service";



@Injectable()
export class ProjectsEffects {
  constructor(private actions$: Actions, private projectsService: ProjectsService, private projectsFacadeService: ProjectsFacadeService) {}

  @Effect()
  loadProjectsAction$ = this.actions$.pipe(
    ofType(ProjectsActionTypes.LoadProjects),
    switchMap((action: LoadProjectsAction) =>
      this.projectsService.loadProjects()
        .pipe(
          map((projects: Project[]) => new LoadProjectsSuccessAction(projects))
    ))
  );

  @Effect()
  loadProjectAction$ = this.actions$.pipe(
    ofType(ProjectsActionTypes.LoadProject),
    switchMap((action: LoadProjectAction) =>
      this.projectsService.loadProject(action.payload)
        .pipe(
          map((project: Project) => new LoadProjectSuccessAction(project))
    ))
  );

  @Effect()
  updateProjectAction$ = this.actions$.pipe(
    ofType(ProjectsActionTypes.UpdateProject),
    switchMap((action: UpdateProjectAction) => this.projectsService.updateProject(action.payload)
      .pipe(
        map((project: Project) => {
          this.projectsFacadeService.projectCallbacks.success();
          return new UpdateProjectSuccessAction(project);
        })
    ))
  );

  @Effect()
  createProjectAction$ = this.actions$.pipe(
    ofType(ProjectsActionTypes.CreateProject),
    switchMap((action: CreateProjectAction) => this.projectsService.createProject(action.payload)
      .pipe(
        map((project: Project) => {
          this.projectsFacadeService.projectCallbacks.success();
          return new CreateProjectSuccessAction(project);
        })
    ))
  );

  @Effect()
  deleteProjectAction$ = this.actions$.pipe(
    ofType(ProjectsActionTypes.DeleteProject),
    switchMap((action: DeleteProjectAction) => this.projectsService.deleteProject(action.payload)
      .pipe(
        map(() => {
          this.projectsFacadeService.projectCallbacks.success();
          return new DeleteProjectSuccessAction(action.payload);
        })
    ))
  );
}
