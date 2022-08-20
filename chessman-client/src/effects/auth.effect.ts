import { Injectable } from "@angular/core";
import { idToken } from "@angular/fire/auth";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { AuthService } from "src/app/services/auth.service";
import * as AuthActions from "../actions/auth.action";


@Injectable()
export class AuthEffects{
    constructor(private action$: Actions , private authService: AuthService){}
    
    authEffect$ =  createEffect(()=>this.action$.pipe(
        ofType(AuthActions.login),
        switchMap(()=>this.authService.login()),
        map(idToken => AuthActions.loginSuccess({idToken:idToken})),
        catchError(error => of(AuthActions.loginFailure({error:error}))),
    )) 

}