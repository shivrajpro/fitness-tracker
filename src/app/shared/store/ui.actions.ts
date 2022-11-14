import { createAction, props } from '@ngrx/store';

export const START_LOADING = '[UI] Start Loading';
export const STOP_LOADING = '[UI] Stop Loading';

export const setLoading = createAction(
  START_LOADING,
  props<{ isLoading:boolean }>()
)