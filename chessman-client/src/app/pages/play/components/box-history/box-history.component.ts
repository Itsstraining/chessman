import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogCreateNewGameComponent } from 'src/app/components/dialog/dialog-create-new-game/dialog-create-new-game.component';
import { GameService } from 'src/app/services/game/game.service';

@Component({
  selector: 'app-box-history',
  templateUrl: './box-history.component.html',
  styleUrls: ['./box-history.component.scss']
})
export class BoxHistoryComponent implements OnInit {

  constructor(public gameService: GameService, private dialog: MatDialog ) { }

  ngOnInit(): void {
  }

  graps = [
    [{
      id: '1',
      numGrap: '1',
      grapFrom: 'G2',
      grapTo: 'E7',
      nameChess: 'm',
      selected: false,
      icon: '',
    },
    {
      id: '1',
      numGrap: '2',
      grapFrom: 'F6',
      grapTo: 'A1',
      nameChess: 'h',
      selected: false,
      icon: '',
    },],
    [{
      id: '1',
      numGrap: '3',
      grapFrom: 'A6',
      grapTo: 'G1',
      nameChess: 't',
      selected: false,
      icon: '',
    },
    {
      id: '1',
      numGrap: '4',
      grapFrom: 'F7',
      grapTo: 'C1',
      nameChess: 'm',
      selected: false,
      icon: '',
    },],
    [{
      id: '1',
      numGrap: '5',
      grapFrom: 'C7',
      grapTo: 'E5',
      nameChess: 'h',
      selected: false,
      icon: '',
    },
    {
      id: '1',
      numGrap: '6',
      grapFrom: 'A8',
      grapTo: 'B6',
      nameChess: 'm',
      selected: false,
      icon: '',
    },],
    [{
      id: '1',
      numGrap: '7',
      grapFrom: 'C7',
      grapTo: 'E5',
      nameChess: 'h',
      selected: false,
      icon: '',
    }, {
      id: '1',
      numGrap: '8',
      grapFrom: 'C7',
      grapTo: 'E5',
      nameChess: 'm',
      selected: false,
      icon: '',
    }],
    [{
      id: '1',
      numGrap: '1',
      grapFrom: 'G2',
      grapTo: 'E7',
      nameChess: 'c',
      selected: false,
      icon: '',
    },
    {
      id: '1',
      numGrap: '2',
      grapFrom: 'F6',
      grapTo: 'A1',
      nameChess: 'v',
      selected: false,
      icon: '',
    },],
    [{
      id: '1',
      numGrap: '3',
      grapFrom: 'A6',
      grapTo: 'G1',
      nameChess: 'm',
      selected: false,
      icon: '',
    },
    {
      id: '1',
      numGrap: '4',
      grapFrom: 'F7',
      grapTo: 'C2',
      nameChess: 'c',
      selected: false,
      icon: '',
    },],
    [{
      id: '1',
      numGrap: '5',
      grapFrom: 'C7',
      grapTo: 'E5',
      nameChess: 'x',
      selected: false,
      icon: '',
    },
    {
      id: '1',
      numGrap: '6',
      grapFrom: 'A8',
      grapTo: 'B6',
      nameChess: 'm',
      selected: false,
      icon: '',
    },],
    [{
      id: '1',
      numGrap: '7',
      grapFrom: 'C7',
      grapTo: 'E5',
      nameChess: 'c',
      selected: false,
      icon: '',
    }, {
      id: '1',
      numGrap: '8',
      grapFrom: 'C7',
      grapTo: 'E5',
      nameChess: 'm',
      selected: false,
      icon: '',
    }],
    [{
      id: '1',
      numGrap: '7',
      grapFrom: 'C7',
      grapTo: 'E5',
      nameChess: 'x',
      selected: true,
      icon: '',
    }],
  ]

  startGame() {
    this.dialog.open(DialogCreateNewGameComponent);
    // if (this.gameService.enoughPlayer()) {
    //   this.gameService.startGame(this.gameService.player1, this.gameService.player2)
    // }
  }

  getValueToProcessBar(uid: string) {
    if (!this.gameService.isGameStart) {
      return 0
    } else {
      if (uid == this.gameService.currentUserIDControll) {
        let res = this.gameService.time.getSeconds() / this.gameService.timePerMove * 100
        return res
      }
      return 0
    }
  }
}
