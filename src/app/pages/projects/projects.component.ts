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
  projects$: Observable<Project[]>;

  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.initializationCore();
  }

  // the reason for providing this initialization function is because the moment that we need to set the internal route's data
  // is NOT necessarily AFTER running the current component's ngOnInit
  // alternatively we could put this initialization stuff in the constructor or as a value for the class property but it
  // doesn't make sense because the initialization code could be complicated
  // which is not suitable to be places in the constructor or as a value for the class property
  initializationCore() {
    this.projects$ = this.projects$ || this.store.pipe(
      select(projectsFeatureKey)
    );
  }

  onActivated(componentReference: any) {
    this.initializationCore();

    if (componentReference instanceof ProjectsListComponent) {
      componentReference.projects$ = this.projects$;
    }
  }
}
