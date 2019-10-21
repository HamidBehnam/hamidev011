import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Project} from '../../../store/projects-store/models/project';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent implements OnInit {
  @Input() project: Project = new Project();
  @Input() submitLabel = 'Create';
  @Output() projectSubmitted: EventEmitter<Project>;
  projectFormGroup: FormGroup;

  constructor() {
    this.projectSubmitted = new EventEmitter<Project>();
  }

  ngOnInit() {
    this.projectFormGroup = new FormGroup({
      id: new FormControl(this.project.id),
      name: new FormControl(this.project.name),
      status: new FormControl(this.project.status),
      description: new FormControl(this.project.description),
      owner: new FormControl(this.project.owner)
    });
  }

  onSubmit(project) {
    this.projectSubmitted.emit(project);
  }
}
