import { Injectable } from '@angular/core';
import { Player } from 'src/app/models/player.model';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  constructor() {

  }

  newPlayer(id: string, control: string, isBase: boolean) {
    let player: Player = {
      id: id,
      name: '',
      elo: 0,
      img: '',
      isBase: isBase,
      chessControl: {
        chessID: control,
        currentCount: -1
      }
    }
    return player
  }
}
