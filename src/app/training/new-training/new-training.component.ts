import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Exercise } from 'src/app/auth/models/exercise.model';
import { TrainingService } from '../training.service';
import * as fromApp from "../../store/app.reducer";
import * as UI from "../../shared/store/ui.selectors"
import { Store } from '@ngrx/store';
import * as fromTraining from "../store/training.state";
import * as TrainingSelectors from "../store/training.selectors";
@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit {
  exercises$!:Observable<Exercise[]>;
  isLoading$!: Observable<boolean>;

  constructor(private trainingService: TrainingService,
    private store:Store<fromTraining.State>
    ) { }

  ngOnInit(): void {
    this.isLoading$ = this.store.select(UI.isLoading);
    this.fetchExercises();
    this.exercises$ = this.store.select(TrainingSelectors.getAvailableExercises);
  }

  fetchExercises() {
    this.trainingService.fetchAvailableExercises();
  }

  onStartTraining(form:NgForm){
    this.trainingService.startExercise(form.value.exercise);
  }

}
