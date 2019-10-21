import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {interval} from 'rxjs';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {
  @Output() projectIdSelected: EventEmitter<string>;

  constructor(private route: ActivatedRoute) {
    this.projectIdSelected = new EventEmitter<string>();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log('this is the subscribe method for routes, params.id: ', params.id);
      this.projectIdSelected.emit(params.id);
    });
  }

}
