import {createFeatureSelector, createSelector} from '@ngrx/store';
import {projectsFeatureKey, ProjectsState} from '../reducers/projects.reducer';

const projectsFeatureSelector = createFeatureSelector<ProjectsState>(projectsFeatureKey);

const getSelectedProjectId = (state: ProjectsState) => state.selectedProjectId;

const getProjects = (state: ProjectsState) => state.projects;

export const selectSelectedProjectId = createSelector(projectsFeatureSelector, getSelectedProjectId);

export const selectProjects = createSelector(projectsFeatureSelector, getProjects);

