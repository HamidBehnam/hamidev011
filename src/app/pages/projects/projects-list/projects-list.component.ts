import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Project} from '../../../store/projects-store/models/project';
import {Router} from '@angular/router';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss']
})
export class ProjectsListComponent implements OnInit {
  projects$: Observable<Project[]>;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToProject(project: Project) {
    this.router.navigate(['./projects', project.id]);
  }

  goToProjectCreator() {
    this.router.navigate(['./projects/create']);
  }
}
