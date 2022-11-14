import { createAction, props } from '@ngrx/store';
import { Exercise } from 'src/app/auth/models/exercise.model';

export const SET_AVAIALBLE_EXERCISES = '[Training] Set Available Exercises';
export const SET_FINISHED_EXERCISES = '[Training] Set Finished Exercises';
export const SET_ACTIVE_TRAINING = '[Training] Set Active Training';

export const setAvailableExercises = createAction(
  SET_AVAIALBLE_EXERCISES,
  props<{ exercises:Exercise[] }>()
)

export const setFinishedExercises = createAction(
  SET_FINISHED_EXERCISES,
  props<{ exercises:Exercise[] }>()
)

export const setActiveExercise = createAction(
    SET_ACTIVE_TRAINING,
  props<{ selectedId:String }>()
)