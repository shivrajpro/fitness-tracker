import { createReducer, on, State } from "@ngrx/store";
import { setLoading } from "./ui.actions";
import { initialState, UIState } from "./ui.state";

export const uiReducer = createReducer(
    initialState,
    on(setLoading, (state, action)=>{
        return {
            ...state,
            isLoading: action.isLoading
        }
    })
)