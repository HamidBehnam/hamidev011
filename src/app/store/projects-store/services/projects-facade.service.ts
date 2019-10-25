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
  UpdateProjectAction
} from '../actions/projects.actions';

@Injectable({
  providedIn: 'root'
})
export class ProjectsFacadeService {
  projects$: Observable<Project[]>;
  currentProject$: Observable<Project>;
  selectedProjectsIds$: Observable<string[]>;

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
  }

  loadProjects() {
    this.store.dispatch(new LoadProjectsAction());
  }

  loadProject(projectId: string) {
    this.store.dispatch(new LoadProjectAction(projectId));
  }

  updateProject(project: Project) {
    this.store.dispatch(new UpdateProjectAction(project));
  }

  selectProjectsIds(projectIds: string[]) {
    this.store.dispatch(new SelectProjectsIdsAction(projectIds));
  }
}
