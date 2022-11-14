import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Store } from '@ngrx/store';
import { map, Subject, Subscription, take } from 'rxjs';
import { Exercise } from '../auth/models/exercise.model';
import * as UIActions from "../shared/store/ui.actions";
import * as TrainingActions from "./store/training.actions";
import * as TrainingSelectors from "./store/training.selectors";
import * as fromTraining from "./store/training.state";

const dummyData = [];
@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  constructor(private db: AngularFirestore,
    private store:Store<fromTraining.State>
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
            // this.availableExercises = exercises;
            // this.exercisesChanged.next([...this.availableExercises]);
            this.store.dispatch(TrainingActions.setAvailableExercises({exercises}));
            this.store.dispatch(UIActions.setLoading({isLoading:false}));
          },
          error: () => {
            // this.exercisesChanged.next([]);
            this.store.dispatch(TrainingActions.setAvailableExercises({exercises:[]}));
            this.store.dispatch(UIActions.setLoading({isLoading:false}));
          }
        })
    );
  }

  startExercise(selectedId: string) {
    this.store.dispatch(TrainingActions.setActiveExercise(
      {selectedId})
    );
  }

  completeExercise() {
    this.store.select(TrainingSelectors.getActiveExercise).pipe(take(1))
    .subscribe((ex:any)=>{
      console.log('data',ex);

      this.addDataToDb({
        ...ex,
        date: new Date(),
        state: 'completed',
      });

      this.store.dispatch(TrainingActions.setActiveExercise({selectedId:null}));
    })    
  }

  cancelExercise(progress: number) {
    this.store.select(TrainingSelectors.getActiveExercise).pipe(take(1))
    .subscribe((ex:any)=>{
      this.addDataToDb({
        ...this.runningExercise!,
        duration: this.runningExercise?.duration! * (progress / 100) || 0,
        calories: this.runningExercise?.calories! * (progress / 100) || 0,
        date: new Date(),
        state: 'cancelled',
      });

      this.store.dispatch(TrainingActions.setActiveExercise({selectedId:null}));
    })

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
          // console.log('exercises', exercises);
          // this.finishedExercisesChanged.next(exercises as Exercise[]);
          this.store.dispatch(
            TrainingActions.setFinishedExercises({exercises:exercises as Exercise[]})
          );
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
