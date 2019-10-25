import {createFeatureSelector, createSelector} from '@ngrx/store';
import {projectsFeatureKey, ProjectsState} from '../reducers/projects.reducer';

const projectsFeatureSelector = createFeatureSelector<ProjectsState>(projectsFeatureKey);

const getSelectedProjectsIds = (state: ProjectsState) => state.selectedProjectsIds;

const getProjects = (state: ProjectsState) => state.projects;

const getCurrentProject = (state: ProjectsState) => state.currentProject;

export const selectSelectedProjectsIds = createSelector(projectsFeatureSelector, getSelectedProjectsIds);

export const selectProjects = createSelector(projectsFeatureSelector, getProjects);

export const selectCurrentProject = createSelector(projectsFeatureSelector, getCurrentProject);

