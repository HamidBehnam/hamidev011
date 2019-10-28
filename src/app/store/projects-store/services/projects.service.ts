import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Params} from '@angular/router';
import {projectsFeatureKey} from '../reducers/projects.reducer';
import {Project} from "../models/project";

@Injectable()
export class ProjectsService {

  constructor(private http: HttpClient) { }

  static getProjectsUrl() {
    return `${environment.apiUrl}/${projectsFeatureKey}`;
  }

  static getProjectUrl(projectId: string) {
    return `${ProjectsService.getProjectsUrl()}/${projectId}`;
  }

  loadProjects(params?: Params) {
    return this.http.get(ProjectsService.getProjectsUrl(), params);
  }

  loadProject(projectId: string) {
    return this.http.get(ProjectsService.getProjectUrl(projectId));
  }

  updateProject(project: Project) {
    return this.http.put(ProjectsService.getProjectUrl(project.id), project);
  }

  createProject(project: Project) {
    return this.http.post(ProjectsService.getProjectsUrl(), project);
  }

  deleteProject(project: Project) {
    return this.http.delete(ProjectsService.getProjectUrl(project.id));
  }
}
