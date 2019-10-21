import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Params} from '@angular/router';
import {projectsFeatureKey} from '../reducers/projects.reducer';
import {ProjectsServiceType} from '../models/projects-service-type';

const serviceToken = Symbol();
const serviceHandle = Symbol();

@Injectable()
export class ProjectsService {
  [serviceToken];

  constructor(private http: HttpClient) { }

  static getUrl() {
    return `${environment.apiUrl}/${projectsFeatureKey}`;
  }

  [serviceHandle](): ProjectsServiceType {
    return {
      loadProjects: (params?: Params) => {
        return this.http.get(ProjectsService.getUrl(), params);
      }
    };
  }

  getService(token?: any) {
    this[serviceToken] = this[serviceToken] || token;

    if (this[serviceToken] === token) {
      return this[serviceHandle]();
    } else {
      throw new Error(`ProjectsService is not a public service.`);
    }
  }
}
