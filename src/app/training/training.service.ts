import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Store } from '@ngrx/store';
import { map, Subject, Subscription } from 'rxjs';
import { Exercise } from '../auth/models/exercise.model';
import * as fromApp from "../store/app.reducer";
import * as UIActions from "../shared/store/ui.actions";
const dummyData = [];
@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  constructor(private db: AngularFirestore,
    private store:Store<fromApp.AppState>
    ) {}

  exerciseChanged = new Subject<Exercise | undefined | null>();
  exercisesChanged = new Subject<Exercise[]>();
  finishedExercisesChanged = new Subject<Exercise[]>();
  availableExercises: Exercise[] = [];
  fbSubs: Subscription[] = [];

  private runningExercise!: Exercise | undefined | null;
  finishedExercises: Exercise[] = [];

  // getAvailableExercises(){
  //   return this.availableExercises.slice();
  // }
  fetchAvailableExercises() {
    this.store.dispatch(UIActions.setLoading({isLoading:true}));
    this.fbSubs.push(
      this.db
        .collection('availableExercises')
        .snapshotChanges()
        .pipe(
          map((docArray) => {
            // throw new Error();
            return docArray.map((doc) => {
              const data: Exercise = doc.payload.doc.data() as Exercise;

              return {
                id: doc.payload.doc.id,
                name: data.name,
                duration: data.duration,
                calories: data.calories,
              };
            });
          })
        )
        .subscribe({
          next: (exercises) => {
            this.availableExercises = exercises;
            this.exercisesChanged.next([...this.availableExercises]);
            this.store.dispatch(UIActions.setLoading({isLoading:false}));
          },
          error: () => {
            this.exercisesChanged.next([]);
            this.store.dispatch(UIActions.setLoading({isLoading:false}));
          }
        })
    );
  }

  startExercise(selectedId: string) {
    // this.db.doc('availableExercises/'+selectedId).update({lastSelected:new Date()});

    this.runningExercise = this.availableExercises.find(
      (ex) => ex.id === selectedId
    );
    this.exerciseChanged.next(this.runningExercise);
  }

  completeExercise() {
    this.addDataToDb({
      ...this.runningExercise!,
      date: new Date(),
      state: 'completed',
    });

    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number) {
    this.addDataToDb({
      ...this.runningExercise!,
      duration: this.runningExercise?.duration! * (progress / 100) || 0,
      calories: this.runningExercise?.calories! * (progress / 100) || 0,
      date: new Date(),
      state: 'cancelled',
    });

    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }
  getRunningExercise() {
    return { ...this.runningExercise };
  }

  fetchCompletedOrCancelledExercises() {
    this.fbSubs.push(
      this.db
        .collection('finishedExercises')
        .valueChanges()
        .subscribe((exercises) => {
          console.log('exercises', exercises);
          this.finishedExercisesChanged.next(exercises as Exercise[]);
        })
    );
  }

  private addDataToDb(exercise: Exercise) {
    this.db.collection('finishedExercises').add(exercise);
  }

  cancelSubscriptions() {
    this.fbSubs.forEach((sub) => sub.unsubscribe());
  }
}
