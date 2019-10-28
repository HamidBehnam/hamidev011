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

const updateProject = (state: ProjectsState, updatedProject: Project) => {
  return state.projects.map(project => project.id === updatedProject.id ? updatedProject : project);
};

const updateCurrentProject = (state: ProjectsState, project: Project) => {
  return state.currentProject ?
    state.currentProject.id === project.id ?
      project :
      state.currentProject :
    state.currentProject;
};

const createProject = (state: ProjectsState, createdProject: Project) => {
  state.projects.push(createdProject);
  return state.projects;
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
    case ProjectsActionTypes.UpdateProjectSuccess:
      return {
        ...state,
        projects: updateProject(state, action.payload),
        currentProject: updateCurrentProject(state, action.payload)
      };
    case ProjectsActionTypes.CreateProjectSuccess:
      return {
        ...state,
        projects: createProject(state, action.payload),
        currentProject: updateCurrentProject(state, action.payload)
      };

    default:
      return state;
  }
}
