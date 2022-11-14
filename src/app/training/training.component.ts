import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { TrainingService } from './training.service';
import * as fromTraining from "./store/training.state";
import { Store } from '@ngrx/store';
import * as TrainingSelectors from "./store/training.selectors";
@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {
  ongoingTraining$!: Observable<boolean>;

  exerciseSub!: Subscription;

  constructor(private store:Store<fromTraining.State>) { }

  ngOnInit(): void {
    this.ongoingTraining$ = this.store.select(TrainingSelectors.getIsTraining);
  }

}
