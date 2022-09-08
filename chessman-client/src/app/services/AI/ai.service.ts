import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Socket } from 'ngx-socket-io';
import { Auth } from '@angular/fire/auth';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AIService {

  socketID = ''
  roomID = ''
  ffishID = ''

  constructor(private http: HttpClient, private socket: Socket, private auth: Auth, private authService: AuthService) {
    this.connectServer()
  }

  connectServer() {
    let data = { user: this.authService.user1 }
    this.socket.emit('connectServer', data)
    this.socket.fromEvent<any>('onConnected').subscribe((e) => {
      this.socketID = e
      console.log(`my socket: [${e}]`)
    })
  }

  createBOTXiangqi() {
    this.socket.emit('createBOTXiangqi')
    this.socket.fromEvent<any>('onCreateBOTXiangqi').subscribe((data: { mess: string, roomID: string, ffishid: string }) => {
      console.log(data.mess)
      this.roomID = data.roomID
      this.ffishID = data.ffishid
    })
  }
  setMoveOn(moveStr:string) {
    let data = { ffishID: this.ffishID, move: moveStr }
    this.socket.emit('setMoveOn', data)
    return this.socket.fromEvent<any>('onSetMoveOn')
  }
  setMove(moveStr: string) {
    return this.http.post<string[]>(environment.endpoint + 'setMove', {
      "moveStr": moveStr,
      "id": "123"
    })
  }
  randomID() {
    let id = Date.now().toString()
    return id + '-' + this.getRandomInt(0, 99).toString();
  }
  getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max++ - min) + min);
  }
}
