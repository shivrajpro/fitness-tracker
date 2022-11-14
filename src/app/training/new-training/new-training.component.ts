import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Exercise } from 'src/app/auth/models/exercise.model';
import { TrainingService } from '../training.service';
import * as fromApp from "../../store/app.reducer";
import * as UI from "../../shared/store/ui.selectors"
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  @Output()  trainingStart = new EventEmitter<void>();
  exercises:Exercise[] = [];
  exercisesSub!:Subscription;
  isLoadingExercises = true;
  isLoading$!: Observable<boolean>;

  constructor(private trainingService: TrainingService,
    private store:Store<fromApp.AppState>
    ) { }

  ngOnInit(): void {
    // this.exercises = this.trainingService.getAvailableExercises();
    // this.exercises = this.db.collection('availableExercises').valueChanges();
    this.isLoading$ = this.store.select(UI.isLoading);

    this.fetchExercises();
    this.exercisesSub = this.trainingService.exercisesChanged.subscribe((exercises)=>{
      this.exercises = exercises;
      this.isLoadingExercises = false;
    })
  }

  fetchExercises() {
    this.isLoadingExercises = true;
    this.trainingService.fetchAvailableExercises();
  }

  onStartTraining(form:NgForm){
    this.trainingService.startExercise(form.value.exercise);
  }

  ngOnDestroy(): void {
    this.exercisesSub.unsubscribe();
  }

}
