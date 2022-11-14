import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UIState } from "./ui.state";

export const UI_STATE_NAME = 'ui';

const getUIState = createFeatureSelector<UIState>(UI_STATE_NAME);

export const isLoading = createSelector(getUIState, (state) => {
  return state.isLoading;
});
