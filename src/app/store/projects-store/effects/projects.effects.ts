import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {
  CreateProjectAction,
  CreateProjectSuccessAction,
  DeleteProjectAction,
  DeleteProjectSuccessAction, DestroySnapshotAction,
  LoadProjectAction,
  LoadProjectsAction,
  LoadProjectsSuccessAction,
  LoadProjectSuccessAction,
  ProjectsActionTypes,
  RollbackRecentChangeAction,
  TakeSnapshotAction,
  UpdateProjectAction,
  UpdateProjectSuccessAction
} from '../actions/projects.actions';
import {catchError, map, retry, switchMap} from 'rxjs/operators';
import {ProjectsService} from '../services/projects.service';
import {Project} from '../models/project';
import {ProjectsFacadeService} from "../services/projects-facade.service";
import {concat, EMPTY, of} from "rxjs";


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

  // TODO: the commented section is transformed to the following Effect to implement the Eagerly updating and
  //  Rolling back in case something is not right in the server communication process
  // @Effect()
  // createProjectAction$ = this.actions$.pipe(
  //   ofType(ProjectsActionTypes.CreateProject),
  //   switchMap((action: CreateProjectAction) => this.projectsService.createProject(action.payload)
  //     .pipe(
  //       map((project: Project) => {
  //         this.projectsFacadeService.projectCallbacks.success();
  //         return new CreateProjectSuccessAction(project);
  //       })
  //   ))
  // );

  @Effect()
  createProjectAction$ = this.actions$.pipe(
    ofType(ProjectsActionTypes.CreateProject),
    switchMap((action: CreateProjectAction) => {
      this.projectsFacadeService.projectCallbacks.success();
      return concat(
        of(new TakeSnapshotAction()),
        of(new CreateProjectSuccessAction(action.payload)),
        this.projectsService.createProject(action.payload)
          .pipe(
            switchMap(() => EMPTY),
            retry(3),
            catchError(error => {
              this.projectsFacadeService.projectCallbacks.error();
              return of(new RollbackRecentChangeAction());
            })
          ),
        of(new DestroySnapshotAction())
      );
    })
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
