import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Exercise } from 'src/app/auth/models/exercise.model';
import { TrainingService } from '../training.service';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { map, Observable, Subscription } from 'rxjs';
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

  constructor(private trainingService: TrainingService) { }

  ngOnInit(): void {
    // this.exercises = this.trainingService.getAvailableExercises();
    // this.exercises = this.db.collection('availableExercises').valueChanges();
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
