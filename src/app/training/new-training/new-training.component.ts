import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Exercise } from 'src/app/auth/models/exercise.model';
import { TrainingService } from '../training.service';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Observable } from 'rxjs';
@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit {
  @Output()  trainingStart = new EventEmitter<void>();
  exercises!:Observable<any>;

  constructor(private trainingService: TrainingService,
    private db:AngularFirestore) { }

  ngOnInit(): void {
    // this.exercises = this.trainingService.getAvailableExercises();
    this.exercises = this.db.collection('availableExercises').valueChanges();
  }

  onStartTraining(form:NgForm){
    this.trainingService.startExercise(form.value.exercise);
  }
}
