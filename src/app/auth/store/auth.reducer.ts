import { createReducer, on } from "@ngrx/store";
import * as AuthActions from "./auth.actions";
import { initialState } from "./auth.state";

export const authReducer = createReducer(
    initialState,
    on(AuthActions.setAuthenticated, (state, action)=>{
        return {
            ...state,
            isAuthenticated: action.isAuthenticated
        }
    })
)