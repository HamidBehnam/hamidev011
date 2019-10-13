import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Params} from '@angular/router';
import {projectsFeatureKey} from '../reducers/projects.reducer';

@Injectable()
export class ProjectsService {

  constructor(private http: HttpClient) { }

  static getUrl() {
    return `${environment.apiUrl}/${projectsFeatureKey}`;
  }

  loadProjects(params?: Params) {
    return this.http.get(ProjectsService.getUrl(), params);
  }
}
