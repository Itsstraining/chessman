import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthStates } from 'src/states/auth.states';
import * as AuthActions from "../../../actions/auth.action";

@Component({
  selector: 'app-dangky',
  templateUrl: './dangky.component.html',
  styleUrls: ['./dangky.component.scss']
})
export class DangkyComponent implements OnInit {

 
  constructor(private store:Store<{auth:AuthStates}>) { }

  ngOnInit(): void {
  }
  login(){
    this.store.dispatch(AuthActions.login());

  }
}
