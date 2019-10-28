import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Project} from '../../../store/projects-store/models/project';
import {ProjectMeta} from '../utils/interfaces/project-meta';
import {Router} from '@angular/router';
import {Callbacks} from "../../../store/shared/utils/interfaces/callbacks";

@Component({
  selector: 'app-project-creator',
  templateUrl: './project-creator.component.html',
  styleUrls: ['./project-creator.component.scss']
})
export class ProjectCreatorComponent implements OnInit {
  @Output() projectCreated: EventEmitter<ProjectMeta>;
  createCallbacks: Callbacks;

  constructor(private router: Router) {
    this.projectCreated = new EventEmitter<ProjectMeta>();
  }

  ngOnInit() {
    this.createCallbacks = {
      success: this.createSuccess,
      error: this.createError
    };
  }

  createSuccess = () => {
    this.router.navigate(['./projects']);
  };

  createError = () => {
    alert(`Please try again later!`);
  };

  onProjectCreated(project: Project) {
    const projectMeta: ProjectMeta = {
      project,
      callbacks: this.createCallbacks
    };
    this.projectCreated.emit(projectMeta);
  }
}
