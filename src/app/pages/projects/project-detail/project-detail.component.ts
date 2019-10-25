import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Project} from '../../../store/projects-store/models/project';
import {Observable} from "rxjs";

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {
  @Input() project$: Observable<Project>;
  @Output() projectIdSelected: EventEmitter<string>;

  constructor(private route: ActivatedRoute) {
    this.projectIdSelected = new EventEmitter<string>();
  }

  ngOnInit() {
    // why not using `this.route.params.pipe(...)` ?
    // because by using the pipe we're actually generating an observable, it won't produce
    // the actual value immediately, it'll produce the value once it's assigned
    // to a variable and it's consumed in the UI or in the code
    this.route.params.subscribe(params => {
      this.projectIdSelected.emit(params.id);
    });
  }

}
