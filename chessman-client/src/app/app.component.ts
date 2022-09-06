import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Store } from '@ngrx/store';
import * as AuthActions from '../actions/auth.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Chessman';
  menuLeft = [
    {
      title: 'Play',
      href: 'play'
    },
    {
      title: 'Chọn phòng',
      href: 'Room'
    },
    {
      title: 'Đăng ký',
      href: 'dangky'
    },
    {
      title: 'Đăng nhập',
      href: 'dangnhap'
    },
    {
      title: 'Menu',
      href: 'menu'
    },
    {
      title: 'Xem',
      href: 'xem'
    },
    {
      title: 'Home',
      href: 'home'
    },
    {
      title: 'Info',
      href: 'info'
    },
    {
      title: 'Game',
      href: 'game'
    },
    {
      title: 'Lobby',
      href: 'loddy'
    },

  ]



  constructor(public authService: AuthService) { }
  logout() {
    this.authService.logout()
  }

  login(){
    this.authService.login()
  }


}
