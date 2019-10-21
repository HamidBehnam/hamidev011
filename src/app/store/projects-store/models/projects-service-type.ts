import {Params} from '@angular/router';

export interface ProjectsServiceType {
  loadProjects(params?: Params): any;
}
