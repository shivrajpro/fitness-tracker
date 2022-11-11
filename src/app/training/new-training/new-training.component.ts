import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Exercise } from 'src/app/auth/models/exercise.model';
import { TrainingService } from '../training.service';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { map, Observable } from 'rxjs';
@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit {
  @Output()  trainingStart = new EventEmitter<void>();
  exercises!:Observable<Exercise[]>;

  constructor(private trainingService: TrainingService,
    private db:AngularFirestore) { }

  ngOnInit(): void {
    // this.exercises = this.trainingService.getAvailableExercises();
    // this.exercises = this.db.collection('availableExercises').valueChanges();
    this.exercises = this.db.collection('availableExercises').snapshotChanges()
    .pipe(map(docArray=>{
      return docArray.map(doc=>{
        const data: Exercise = doc.payload.doc.data() as Exercise;

        return {
          id: doc.payload.doc.id,
          name: data.name,
          duration:data.duration,
          calories: data.calories
        }
      })
    }))
  }

  onStartTraining(form:NgForm){
    this.trainingService.startExercise(form.value.exercise);
  }
}
