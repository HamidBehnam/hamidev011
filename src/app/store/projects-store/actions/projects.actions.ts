import { Action } from '@ngrx/store';
import {Project} from '../models/project';

export enum ProjectsActionTypes {
  LoadProjects = '[Projects] Load Projects',
  LoadProjectsSuccess = '[Projects] Load Projects Success',
  LoadProject = '[Projects] Load Project',
  LoadProjectSuccess = '[Projects] Load Project Success',
  UpdateProject = '[Projects] Update Project',
  UpdateProjectSuccess = '[Projects] Update Project Success',
  CreateProject = '[Projects] Create Project',
  CreateProjectSuccess = '[Projects] Create Project Success',
  DeleteProject = '[Projects] Delete Project',
  DeleteProjectSuccess = '[Projects] Delete Project Success',
  TakeSnapshot = '[Projects] Take Snapshot',
  DestroySnapshot = '[Projects] Destroy Snapshot',
  RollbackRecentChange = '[Projects] Rollback Recent Change',
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

export class CreateProjectAction implements Action {
  readonly type = ProjectsActionTypes.CreateProject;
  constructor(public payload: Project) {}
}

export class CreateProjectSuccessAction implements Action {
  readonly type = ProjectsActionTypes.CreateProjectSuccess;
  constructor(public payload: Project) {}
}

export class DeleteProjectAction implements Action {
  readonly type = ProjectsActionTypes.DeleteProject;
  constructor(public payload: Project) {}
}

export class DeleteProjectSuccessAction implements Action {
  readonly type = ProjectsActionTypes.DeleteProjectSuccess;
  constructor(public payload: Project) {}
}

export class TakeSnapshotAction implements Action {
  readonly type = ProjectsActionTypes.TakeSnapshot;
}

export class DestroySnapshotAction implements Action {
  readonly type = ProjectsActionTypes.DestroySnapshot;
}

export class RollbackRecentChangeAction implements Action {
  readonly type = ProjectsActionTypes.RollbackRecentChange;
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
  | CreateProjectAction
  | CreateProjectSuccessAction
  | DeleteProjectAction
  | DeleteProjectSuccessAction
  | TakeSnapshotAction
  | DestroySnapshotAction
  | RollbackRecentChangeAction
  | SelectProjectsIdsAction;
