import {Component, OnInit} from '@angular/core';
import {ProjectsListComponent} from './projects-list/projects-list.component';
import {select, Store} from '@ngrx/store';
import {projectsFeatureKey, State} from '../../store/projects-store/reducers/projects.reducer';
import {Observable} from 'rxjs';
import {Project} from '../../store/projects-store/models/project';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  // this won't be available in the onActivate method
  projects$: Observable<Project[]>;

  constructor(private store: Store<State>) { }

  ngOnInit() {
    // this won't be available in the onActivate method
    this.projects$ = this.store.pipe(
      select(projectsFeatureKey)
    );
  }

  onActivated(componentReference: any) {
    if (componentReference instanceof ProjectsListComponent) {
      componentReference.projects$ = this.store.pipe(
        select(projectsFeatureKey)
      );
    }
  }
}
