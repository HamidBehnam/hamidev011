import { Action } from '@ngrx/store';
import {Project} from '../models/project';

export enum ProjectsActionTypes {
  LoadProjects = '[Projects] Load Projects',
  LoadProjectsSuccess = '[Projects] Load Projects Success',
  LoadProject = '[Projects] Load Project',
  LoadProjectSuccess = '[Projects] Load Project Success',
  UpdateProject = '[Projects] Update Project',
  UpdateProjectSuccess = '[Projects] Update Project Success',
  SelectProjectsIds = '[Projects] Select Projects Ids',
}

export class LoadProjectsAction implements Action {
  readonly type = ProjectsActionTypes.LoadProjects;
}

export class LoadProjectsSuccessAction implements Action {
  readonly type = ProjectsActionTypes.LoadProjectsSuccess;
  constructor(public payload: Project[]) { }
}

export class LoadProjectAction implements Action {
  readonly type = ProjectsActionTypes.LoadProject;
  constructor(public payload: string) {}
}

export class LoadProjectSuccessAction implements Action {
  readonly type = ProjectsActionTypes.LoadProjectSuccess;
  constructor(public payload: Project) {}
}

export class UpdateProjectAction implements Action {
  readonly type = ProjectsActionTypes.UpdateProject;
  constructor(public payload: Project) {}
}

export class UpdateProjectSuccessAction implements Action {
  readonly type = ProjectsActionTypes.UpdateProjectSuccess;
  constructor(public payload: Project) {}
}

export class SelectProjectsIdsAction implements Action {
  readonly type = ProjectsActionTypes.SelectProjectsIds;
  constructor(public payload: string[]) { }
}

export type ProjectsActions = LoadProjectsAction
  | LoadProjectsSuccessAction
  | LoadProjectAction
  | LoadProjectSuccessAction
  | UpdateProjectAction
  | UpdateProjectSuccessAction
  | SelectProjectsIdsAction;
