import { createAction, props } from '@ngrx/store';
import { Exercise } from 'src/app/auth/models/exercise.model';

export const SET_AVAIALBLE_EXERCISES = '[Training] Set Available Exercises';
export const SET_FINISHED_EXERCISES = '[Training] Set Finished Exercises';
export const START_TRAINING = '[Training] Start Training';
export const STOP_TRAINING = '[Training] Stop Training';

export const setAvailableExercises = createAction(
  SET_AVAIALBLE_EXERCISES,
  props<{ exercises:Exercise[] }>()
)

export const setFinishedExercises = createAction(
  SET_FINISHED_EXERCISES,
  props<{ exercises:Exercise[] }>()
)

export const startExercise = createAction(
    START_TRAINING,
  props<{ selectedId:String | null }>()
)

export const stopExercise = createAction(
  STOP_TRAINING,
  props<{ exercise:Exercise | null }>()
)