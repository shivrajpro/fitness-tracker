import { createFeatureSelector, createSelector } from "@ngrx/store";
import { TrainingState } from "./training.state";

export const TRAINING_STATE_NAME = 'training';

const getTrainingState = createFeatureSelector<TrainingState>(TRAINING_STATE_NAME);

export const getAvailableExercises = createSelector(getTrainingState, (state) => {
  return state.availableExercises;
});

export const getFinishedExercises = createSelector(getTrainingState, (state) => {
  return state.finishedExercises;
});

export const getActiveExercise = createSelector(getTrainingState, (state) => {
  return state.activeExercise;
});

export const getIsTraining = createSelector(getTrainingState, (state) => {
  return state.activeExercise !== null;
});
