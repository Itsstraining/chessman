import { Injectable } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup, User } from '@angular/fire/auth';
import { from } from 'rxjs';
import { login } from 'src/actions/auth.action';

import { getAuth, onAuthStateChanged } from "firebase/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user1 = { id: '', userName: '' }
  user!: User
  hasUser = false
  constructor(private auth: Auth) {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user
        localStorage.setItem('uid', this.user.uid);
        this.hasUser = true
        console.log(this.user)
      } else {
        this.hasUser = false
        console.log(this.user)
      }
    });
    let user = { id: '', userName: '' }
    if (this.auth.currentUser != null) {
      user.id = this.auth.currentUser.uid ?? this.randomID()
      user.userName = this.auth.currentUser.displayName ?? ''
    } else {
      user.id = this.randomID()
      user.userName = ''
    }
  }

  login() {
    return from(new Promise<string>(async (resolve, reject) => {
      try {
        let credential = await signInWithPopup(this.auth, new GoogleAuthProvider());
        let idToken = await credential.user.getIdToken();
        resolve(idToken)
      }
      catch {
        reject("cannot login with GG");
      }

    }))
  }

  async logout() {
    await this.auth.signOut()
    localStorage.setItem('uid', '');
  }

  randomID() {
    let id = Date.now().toString()
    return id + '-' + this.getRandomInt(0, 99).toString();
  }
  getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max++ - min) + min);
  }
}
