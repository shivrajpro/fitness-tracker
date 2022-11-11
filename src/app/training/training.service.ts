import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Subject } from 'rxjs';
import { Exercise } from '../auth/models/exercise.model';

const dummyData = []
@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  constructor(private db:AngularFirestore){}

  exerciseChanged = new Subject<Exercise | undefined | null>();
  exercisesChanged = new Subject<Exercise[]>();
  availableExercises:Exercise[] = [];

  private runningExercise!: Exercise | undefined | null;
  exercises: Exercise[] = [];

  // getAvailableExercises(){
  //   return this.availableExercises.slice();
  // }
  fetchAvailableExercises(){
    this.db.collection('availableExercises').snapshotChanges()
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
    })).subscribe((exercises)=>{
      this.availableExercises = exercises;
      this.exercisesChanged.next([...this.availableExercises]);
    })
  }

  startExercise(selectedId:string){
    this.runningExercise = this.availableExercises.find((ex)=> ex.id ===  selectedId);
    this.exerciseChanged.next(this.runningExercise);
  }

  completeExercise(){
    this.exercises.push({...this.runningExercise!,
      date: new Date(),
      state: 'completed'
    })

    this.runningExercise = null;
    this.exerciseChanged.next(null);

  }

  cancelExercise(progress:number){
    this.exercises.push({
      ...this.runningExercise!,
      duration: this.runningExercise?.duration! * (progress / 100) || 0,
      calories: this.runningExercise?.calories! * (progress / 100) || 0,
      date: new Date(),
      state: 'cancelled',
    });

    this.runningExercise = null;
    this.exerciseChanged.next(null);

  }
  getRunningExercise(){
    return {...this.runningExercise}
  }

  getCompletedOrCancelledExercises(){
    return this.exercises.slice();
  }
}
