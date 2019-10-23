import {Component, OnInit} from '@angular/core';
import {ProjectsListComponent} from './projects-list/projects-list.component';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Project} from '../../store/projects-store/models/project';
import {ProjectsFacadeService} from '../../store/projects-store/services/projects-facade.service';
import {ProjectDetailComponent} from './project-detail/project-detail.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects$: Observable<Project[]>;
  // the reason for using the BehaviorSubject is because the moment that we post the first value in the
  // controller class the rendering process is not done yet so we'll miss the first value.
  // By using the BehaviorSubject it stores the posted value so UI can show the first value as well.
  selectedProjectId$: BehaviorSubject<string>;

  constructor(private projectsFacadeService: ProjectsFacadeService) {
    this.selectedProjectId$ = new BehaviorSubject<string>('');
  }

  ngOnInit() {
    this.initializationCore();
    this.loadProjects();
  }

  // the reason for providing this initialization function is because the moment that we need to set the internal route's data
  // is NOT necessarily AFTER running the current component's ngOnInit
  // alternatively we could put this initialization stuff in the constructor or as a value for the class property but it
  // doesn't make sense because the initialization code could be complicated
  // which is not suitable to be places in the constructor or as a value for the class property
  initializationCore() {
    this.projects$ = this.projectsFacadeService.projects$;
  }

  loadProjects() {
    this.projectsFacadeService.loadProjects();
  }

  onActivated(componentReference: any) {
    this.initializationCore();

    if (componentReference instanceof ProjectsListComponent) {
      componentReference.projects$ = this.projects$;
    } else if (componentReference instanceof ProjectDetailComponent) {
      componentReference.projectIdSelected.subscribe(projectId =>
        this.selectedProjectId$.next(projectId));
    }
  }
}
