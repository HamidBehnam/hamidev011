import { Injectable } from '@angular/core';
import {select, Store} from '@ngrx/store';
import {State} from '../reducers/projects.reducer';
import {Observable} from 'rxjs';
import {Project} from '../models/project';
import {selectProjects} from '../selectors/projects.selectors';
import {LoadProjectsAction} from '../actions/projects.actions';

@Injectable({
  providedIn: 'root'
})
export class ProjectsFacadeService {
  projects$: Observable<Project[]>;

  constructor(private store: Store<State>) {
    this.projects$ = this.store.pipe(
      select(selectProjects)
    );
  }

  loadProjects() {
    this.store.dispatch(new LoadProjectsAction());
  }
}
