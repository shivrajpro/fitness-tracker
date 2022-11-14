import { Exercise } from "src/app/auth/models/exercise.model";
import * as fromApp from "../../store/app.reducer";
export interface TrainingState{
    availableExercises:Exercise[];
    finishedExercises:Exercise[];
    activeExercise:Exercise | null;
}

export interface State extends fromApp.AppState{
    training:TrainingState;
}

export const initialState:TrainingState = {
    availableExercises:[],
    finishedExercises:[],
    activeExercise:null
}