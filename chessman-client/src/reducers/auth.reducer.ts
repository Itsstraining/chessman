import { createReducer, on } from "@ngrx/store";
import * as AuthActions from '../actions/auth.action'
import { AuthStates } from "src/states/auth.states";
import { state } from "@angular/animations";

const initialState: AuthStates = {
    isAuthenticated: false,
    idToken: "",
    error: "",

}




export const authReducer =createReducer(
    initialState,
    on(AuthActions.login, state => state),
    on(AuthActions.loginSuccess,(state,action)=>({ ...state,isAuthenticated: true, idToken:action.idToken})),
    on(AuthActions.loginFailure,(state,action)=>({...state,error:action.error})),
)