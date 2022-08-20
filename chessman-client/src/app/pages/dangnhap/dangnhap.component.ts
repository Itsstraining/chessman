import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthStates } from 'src/states/auth.states';
import * as AuthActions from "../../../actions/auth.action";

@Component({
  selector: 'app-dangnhap',
  templateUrl: './dangnhap.component.html',
  styleUrls: ['./dangnhap.component.scss']
})
export class DangnhapComponent implements OnInit {
  idToken$ =this.store.select((state)=> state.auth.idToken)

  constructor(private store:Store<{auth:AuthStates}>) { }

  ngOnInit(): void {
  }
  login(){
    this.store.dispatch(AuthActions.login());
    console.log(this.idToken$)
  }

}
