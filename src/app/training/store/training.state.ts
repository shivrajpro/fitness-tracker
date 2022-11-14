import { Exercise } from "src/app/auth/models/exercise.model";

export interface TrainingState{
    availableExercises:Exercise[];
    finishedExercises:Exercise[];
    activeExercise:Exercise | null;
}

export interface State extends TrainingState{
    training:TrainingState;
}

export const initialState:TrainingState = {
    availableExercises:[],
    finishedExercises:[],
    activeExercise:null
}