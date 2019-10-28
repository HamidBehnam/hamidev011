import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Project} from '../../../store/projects-store/models/project';
import {Observable, ReplaySubject} from 'rxjs';
import {ProjectMeta} from '../utils/interfaces/project-meta';
import {ProjectCallbacks} from '../../../store/projects-store/interfaces/project-callbacks';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit, OnDestroy {
  @Input() project$: Observable<Project>;
  @Output() projectId: EventEmitter<string>;
  @Output() projectUpdated: EventEmitter<ProjectMeta>;
  @Output() projectDeleted: EventEmitter<ProjectMeta>;
  // lear more about the ReplaySubject: https://stackoverflow.com/a/43119768/2281403
  destroyed$: ReplaySubject<boolean>;
  project: Project;
  pageMode: string;
  callbacks: ProjectCallbacks;


  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    this.projectId = new EventEmitter<string>();
    this.projectUpdated = new EventEmitter<ProjectMeta>();
    this.projectDeleted = new EventEmitter<ProjectMeta>();
    this.destroyed$ = new ReplaySubject<boolean>(1);
  }

  ngOnInit() {
    // why not using `this.activatedRoute.params.pipe(...)` ?
    // because by using the pipe we're actually generating an observable, it won't produce
    // the actual value immediately, it'll produce the value once it's assigned
    // to a variable and it's consumed in the UI or in the code
    this.activatedRoute.params.subscribe(params => {
      this.projectId.emit(params.id);
    });

    this.activatedRoute.queryParams.subscribe(queryParams => this.pageMode = queryParams.mode);
    this.callbacks = {
      success: this.updateSuccess
    };

    this.project$.pipe(
      takeUntil(this.destroyed$)
    ).subscribe((project: Project) => this.project = project);
  }

  // is written with arrow notation to be able to get access to `this`.
  updateSuccess = () => {
    const queryParams: Params = {
      // setting the param to null will remove it from the query string.
      mode: null
    };

    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams,
      queryParamsHandling: 'merge'
    });
  };

  deleteSuccess = () => {
    this.router.navigate(['/projects']);
  };

  onProjectSubmitted(project: Project) {
    this.projectUpdated.emit({
      project,
      callbacks: this.callbacks
    });
  }

  deleteProject() {
    const confirmProjectDeletion = confirm(`Are you sure you wanna delete the project?`).valueOf();

    if (confirmProjectDeletion) {
      const projectMeta: ProjectMeta = {
        project: this.project,
        callbacks: {
          success: this.deleteSuccess
        }
      };

      this.projectDeleted.emit(projectMeta);
    }
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
