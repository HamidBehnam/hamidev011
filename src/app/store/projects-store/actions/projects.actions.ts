import { Action } from '@ngrx/store';
import {Project} from '../models/project';

export enum ProjectsActionTypes {
  LoadProjects = '[Projects] Load Projects',
  LoadProjectsSuccess = '[Projects] Load Projects Success',
  SelectProjectsIds = '[Projects] Select Projects Ids',
}

export class LoadProjectsAction implements Action {
  readonly type = ProjectsActionTypes.LoadProjects;
}

export class LoadProjectsSuccessAction implements Action {
  readonly type = ProjectsActionTypes.LoadProjectsSuccess;
  constructor(public payload: Project[]) { }
}

export class SelectProjectsIdsAction implements Action {
  readonly type = ProjectsActionTypes.SelectProjectsIds;
  constructor(private payload: string[]) { }
}

export type ProjectsActions = LoadProjectsAction
  | LoadProjectsSuccessAction
  | SelectProjectsIdsAction;
