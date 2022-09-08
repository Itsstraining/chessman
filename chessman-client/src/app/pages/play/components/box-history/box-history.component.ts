import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogCreateNewGameComponent } from 'src/app/components/dialog/dialog-create-new-game/dialog-create-new-game.component';
import { Cell } from 'src/app/models/chess.model';
import { GameNew } from 'src/app/models/gameNew.model';
import { AIService } from 'src/app/services/AI/ai.service';
import { GameService } from 'src/app/services/game/game.service';
import { HistoryService } from 'src/app/services/history/history.service';
import { XiangqiService } from 'src/app/services/xiangqi/xiangqi.service';

@Component({
  selector: 'app-box-history',
  templateUrl: './box-history.component.html',
  styleUrls: ['./box-history.component.scss']
})
export class BoxHistoryComponent implements OnInit {
  constructor(
    public gameService: GameService,
    private dialog: MatDialog,
    public hs: HistoryService,
    private aIService: AIService,
    private hService: HistoryService,
    private chessS: XiangqiService
  ) { }

  ngOnInit(): void {
  }

  startGame() {
    let dialogRef = this.dialog.open(DialogCreateNewGameComponent);
    dialogRef.afterClosed().subscribe((e: { newGame: boolean, gameMode: GameNew }) => {
      if (e != undefined && e.newGame) {
        this.gameService.player1 = this.gameService.newPlayer('baszsdasjhdas', 'Player1', 1222, 'a3', 'xmtsvspc', true, false)
        this.chessS.resetTable(this.chessS.currenChessTable, this.gameService.player1)
        this.hService.graps.length = 0
        this.hService.grapsHalf.length = 0

        if (e.gameMode.isWithBot) {

          this.gameService.player2 = this.gameService.newPlayer('lkajshkldjask', 'Player2', 1230, 'a2', 'XMTSVSPC', false, true)
          this.gameService.startGame(
            this.gameService.player1,
            this.gameService.player2,
            e.gameMode.tGian1Nuoc,
            e.gameMode.tGian1User,
            0
          ) // 0: 2 off
          this.aIService.createBOTXiangqi()
        } else if (!e.gameMode.isWithBot) {
          this.gameService.player2 = this.gameService.newPlayer('lkajshkldjask', 'Player2', 1230, 'a2', 'XMTSVSPC', false, false)
          this.gameService.startGame(
            this.gameService.player1,
            this.gameService.player2,
            e.gameMode.tGian1Nuoc,
            e.gameMode.tGian1User,
            0
          ) // 0: 2 off
        }
      }
    })

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
