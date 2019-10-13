import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Project} from '../../../store/projects-store/models/project';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss']
})
export class ProjectsListComponent implements OnInit {
  projects$: Observable<Project[]>;

  constructor() { }

  ngOnInit() {
  }
}
