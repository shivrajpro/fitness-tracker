import { createReducer, on } from "@ngrx/store";
import * as TrainingActions from "./training.actions";
import { initialState } from "./training.state";

export const trainingReducer = createReducer(
    initialState,
    on(TrainingActions.setAvailableExercises, (state, action)=>{
        return {
            ...state,
            availableExercises:action.exercises
        }
    }),
    on(TrainingActions.setFinishedExercises, (state, action)=>{
        return {
            ...state,
            finishedExercises:action.exercises
        }
    }),
    on(TrainingActions.setActiveExercise, (state, action)=>{
        return {
            ...state,
            activeExercise:action.exercise
        }
    })
)