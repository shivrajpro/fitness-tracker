import { createAction, props } from '@ngrx/store';

export const SET_AUTHENTICATED = '[Auth] Set Authenticated';

export const setAuthenticated = createAction(
  SET_AUTHENTICATED,
  props<{ isAuthenticated:boolean }>()
)