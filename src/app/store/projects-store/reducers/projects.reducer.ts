import * as fromRoot from 'src/app/app.reducer';
import {Project} from '../models/project';
import {ProjectsActions, ProjectsActionTypes} from '../actions/projects.actions';


export const projectsFeatureKey = 'projects';

export interface State extends fromRoot.State {
  [projectsFeatureKey]: ProjectsState;
}

export interface ProjectsStateCore {
  projects: Project[];
  currentProject: Project | null;
  selectedProjectsIds: string[] | null;
}

export interface ProjectsState extends ProjectsStateCore {
  snapshot: ProjectsStateCore;
}

export const initialStateCore: ProjectsStateCore = {
  projects: [],
  currentProject: null,
  selectedProjectsIds: null
};

export const initialState: ProjectsState = {
  ...initialStateCore,
  snapshot: initialStateCore
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

const deleteProject = (state: ProjectsState, deletedProject: Project) => {
  return state.projects.filter(project => project.id !== deletedProject.id);
};

const takeSnapshot = (state: ProjectsState): ProjectsStateCore => {
  return {
    projects: JSON.parse(JSON.stringify(state.projects)),
    currentProject: JSON.parse(JSON.stringify(state.currentProject)),
    selectedProjectsIds: JSON.parse(JSON.stringify(state.selectedProjectsIds)),
  };
};

const destroySnapshot = (): ProjectsStateCore => {
  return initialStateCore;
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
    case ProjectsActionTypes.DeleteProjectSuccess:
      return {
        ...state,
        projects: deleteProject(state, action.payload),
        currentProject: null
      };
    case ProjectsActionTypes.TakeSnapshot:
      return {
        ...state,
        snapshot: takeSnapshot(state)
      };
    case ProjectsActionTypes.DestroySnapshot:
      return {
        ...state,
        snapshot: destroySnapshot()
      };
    case ProjectsActionTypes.RollbackRecentChange:
      return {
        ...state,
        ...state.snapshot
      };

    default:
      return state;
  }
}
