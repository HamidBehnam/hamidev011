import * as fromRoot from 'src/app/app.reducer';
import {Project} from '../models/project';
import {ProjectsActions, ProjectsActionTypes} from '../actions/projects.actions';


export const projectsFeatureKey = 'projects';

export interface State extends fromRoot.State {
  [projectsFeatureKey]: ProjectsState;
}

export interface ProjectsState {
  projects: Project[];
  currentProject: Project | null;
  selectedProjectsIds: string[] | null;
}

export const initialState: ProjectsState = {
  projects: [],
  currentProject: null,
  selectedProjectsIds: null
};

export function reducer(state = initialState, action: ProjectsActions): ProjectsState {
  switch (action.type) {
    case ProjectsActionTypes.LoadProjectsSuccess:
      return {
        ...state,
        projects: action.payload
      };
    case ProjectsActionTypes.SelectProjectsIds:
      return {
        ...state,
        selectedProjectsIds: action.payload
      };
    case ProjectsActionTypes.LoadProjectSuccess:
      return {
        ...state,
        currentProject: action.payload
      };

    default:
      return state;
  }
}
