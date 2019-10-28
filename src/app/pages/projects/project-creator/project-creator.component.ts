import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Project} from '../../../store/projects-store/models/project';
import {ProjectMeta} from '../utils/interfaces/project-meta';
import {Router} from '@angular/router';

@Component({
  selector: 'app-project-creator',
  templateUrl: './project-creator.component.html',
  styleUrls: ['./project-creator.component.scss']
})
export class ProjectCreatorComponent implements OnInit {
  @Output() projectCreated: EventEmitter<ProjectMeta>;

  constructor(private router: Router) {
    this.projectCreated = new EventEmitter<ProjectMeta>();
  }

  ngOnInit() {
  }

  createSuccess = () => {
    this.router.navigate(['./projects']);
  };

  onProjectCreated(project: Project) {
    const projectMeta: ProjectMeta = {
      project,
      callbacks: {
        success: this.createSuccess
      }
    };
    this.projectCreated.emit(projectMeta);
  }
}
