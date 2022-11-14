import { authReducer } from "../auth/store/auth.reducer";
import { AUTH_STATE_NAME } from "../auth/store/auth.selectors";
import { AuthState } from "../auth/store/auth.state";
import { uiReducer } from "../shared/store/ui.reducer";
import { UI_STATE_NAME } from "../shared/store/ui.selectors";
import { UIState } from "../shared/store/ui.state";

export interface AppState{
    [UI_STATE_NAME]:UIState,
    [AUTH_STATE_NAME]:AuthState;
}

export const appReducer = {
    [UI_STATE_NAME]: uiReducer,
    [AUTH_STATE_NAME]: authReducer
}