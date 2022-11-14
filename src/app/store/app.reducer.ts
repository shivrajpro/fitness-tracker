import { uiReducer } from "../shared/store/ui.reducer";
import { UI_STATE_NAME } from "../shared/store/ui.selectors";
import { UIState } from "../shared/store/ui.state";

export interface AppState{
    [UI_STATE_NAME]:UIState
}

export const appReducer = {
    [UI_STATE_NAME]: uiReducer
}