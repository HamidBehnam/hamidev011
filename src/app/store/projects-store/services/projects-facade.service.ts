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
  UpdateProjectAction, CreateProjectAction
} from '../actions/projects.actions';
import {ProjectCallbacks} from "../interfaces/project-callbacks";

@Injectable({
  providedIn: 'root'
})
export class ProjectsFacadeService {
  projects$: Observable<Project[]>;
  currentProject$: Observable<Project>;
  selectedProjectsIds$: Observable<string[]>;
  projectCallbacks: ProjectCallbacks;
  private readonly projectDefaultCallbacks: ProjectCallbacks;

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

  private registerCallbacks(projectCallbacks: ProjectCallbacks) {
    this.projectCallbacks = {
      ...this.projectDefaultCallbacks,
      ...projectCallbacks
    };
  }

  updateProject(project: Project, projectCallbacks: ProjectCallbacks) {
    this.registerCallbacks(projectCallbacks);
    this.store.dispatch(new UpdateProjectAction(project));
  }

  createProject(project: Project, projectCallbacks: ProjectCallbacks) {
    this.registerCallbacks(projectCallbacks);
    this.store.dispatch(new CreateProjectAction(project));
  }

  selectProjectsIds(projectIds: string[]) {
    this.store.dispatch(new SelectProjectsIdsAction(projectIds));
  }
}
