import { Action } from '@ngrx/store';
import {Project} from '../models/project';

export enum ProjectsActionTypes {
  LoadProjects = '[Projects] Load Projects',
  LoadProjectsSuccess = '[Projects] Load Projects Success',
}

export class LoadProjectsAction implements Action {
  readonly type = ProjectsActionTypes.LoadProjects;
}

export class LoadProjectsSuccessAction implements Action {
  readonly type = ProjectsActionTypes.LoadProjectsSuccess;
  constructor(public payload: Project[]) { }
}


export type ProjectsActions = LoadProjectsAction | LoadProjectsSuccessAction;
