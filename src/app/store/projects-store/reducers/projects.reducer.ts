import { Action } from '@ngrx/store';
import * as fromRoot from 'src/app/app.reducer';
import {Project} from '../models/project';


export const projectsFeatureKey = 'projects';

export interface State extends fromRoot.State {
  [projectsFeatureKey]: ProjectsState;
}

export interface ProjectsState {
  projects: Project[];
  selectedProjectId: string | null;
}

const firstProject = new Project();
firstProject.id = '1';
firstProject.name = 'Project 1';
firstProject.status = 'started';
firstProject.owner = '234';
firstProject.description = 'this is the project 1';

const secondProject = new Project();
secondProject.id = '1';
secondProject.name = 'Project 1';
secondProject.status = 'started';
secondProject.owner = '234';
secondProject.description = 'this is the project 1';

export const initialState: ProjectsState = {
  projects: [firstProject, secondProject],
  selectedProjectId: null
};

export function reducer(state = initialState, action: Action): ProjectsState {
  switch (action.type) {

    default:
      return state;
  }
}
