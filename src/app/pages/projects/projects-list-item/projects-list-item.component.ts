import {Component, Input, OnInit} from '@angular/core';
import {Project} from '../../../store/projects-store/models/project';

@Component({
  selector: 'app-projects-list-item',
  templateUrl: './projects-list-item.component.html',
  styleUrls: ['./projects-list-item.component.scss']
})
export class ProjectsListItemComponent implements OnInit {
  @Input() project: Project;

  constructor() { }

  ngOnInit() {
  }

}
