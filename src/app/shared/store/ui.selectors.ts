import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UIState } from "./ui.state";

export const UI_STATE_NAME = 'ui';

const getAuthState = createFeatureSelector<UIState>(UI_STATE_NAME);

export const isLoading = createSelector(getAuthState, (state) => {
  return state.isLoading;
});
