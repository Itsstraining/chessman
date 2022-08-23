import { createAction , props } from "@ngrx/store";




export const login = createAction('[Auth] login')
export const loginSuccess = createAction('[Auth] login Success', props<{idToken : string}>())
export const loginFailure = createAction('[Auth] login Failure', props<{error : string}>())