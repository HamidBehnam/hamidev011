import { Injectable } from '@angular/core';
import {select, Store} from '@ngrx/store';
import {State} from '../reducers/projects.reducer';
import {Observable} from 'rxjs';
import {Project} from '../models/project';
import {selectCurrentProject, selectProjects, selectSelectedProjectsIds} from '../selectors/projects.selectors';
import {
  LoadProjectsAction,
  LoadProjectAction,
  SelectProjectsIdsAction,
  UpdateProjectAction, CreateProjectAction, DeleteProjectAction, ResetCurrentProjectAction
} from '../actions/projects.actions';
import {Callbacks} from "../../shared/utils/interfaces/callbacks";

// TODO: Also check https://github.com/johnpapa/ngrx-demo

@Injectable({
  providedIn: 'root'
})
export class ProjectsFacadeService {
  projects$: Observable<Project[]>;
  currentProject$: Observable<Project>;
  selectedProjectsIds$: Observable<string[]>;
  callbacks: Callbacks;
  private readonly projectDefaultCallbacks: Callbacks;

  constructor(private store: Store<State>) {
    this.projects$ = this.store.pipe(
      select(selectProjects)
    );

    this.selectedProjectsIds$ = this.store.pipe(
      select(selectSelectedProjectsIds)
    );

    this.currentProject$ = this.store.pipe(
      select(selectCurrentProject)
    );

    this.projectDefaultCallbacks = {
      success: () => {},
      error: () => {}
    };
  }

  loadProjects() {
    this.store.dispatch(new LoadProjectsAction());
  }

  loadProject(projectId: string) {
    this.store.dispatch(new LoadProjectAction(projectId));
  }

  private registerCallbacks(callbacks: Callbacks) {
    this.callbacks = {
      ...this.projectDefaultCallbacks,
      ...callbacks
    };
  }

  updateProject(project: Project, callbacks: Callbacks) {
    this.registerCallbacks(callbacks);
    this.store.dispatch(new UpdateProjectAction(project));
  }

  createProject(project: Project, callbacks: Callbacks) {
    this.registerCallbacks(callbacks);
    this.store.dispatch(new CreateProjectAction(project));
  }

  deleteProject(project: Project, callbacks: Callbacks) {
    this.registerCallbacks(callbacks);
    this.store.dispatch(new DeleteProjectAction(project));
  }

  resetCurrentProject() {
    this.store.dispatch(new ResetCurrentProjectAction());
  }

  selectProjectsIds(projectIds: string[]) {
    this.store.dispatch(new SelectProjectsIdsAction(projectIds));
  }
}
