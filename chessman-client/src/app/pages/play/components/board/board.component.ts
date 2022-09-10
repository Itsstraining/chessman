import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogwingameComponent } from 'src/app/components/dialog/dialogwingame/dialogwingame.component';
import { Chess, Cell, Position } from 'src/app/models/chess.model';
import { Grap } from 'src/app/models/grap.model';
import { Player } from 'src/app/models/player.model';
import { AIService } from 'src/app/services/AI/ai.service';
import { GameService } from 'src/app/services/game/game.service';
import { HistoryService } from 'src/app/services/history/history.service';
import { ShareService } from 'src/app/services/share.service';
import { XiangqiService } from 'src/app/services/xiangqi/xiangqi.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  table: Cell[][]
  chess: Chess
  currentPlayer: Player
  fPosition: Position = this.gameService.fPosition
  tPosition: Position = this.gameService.tPosition
  grap: Grap;
  strBoard = 'XMTSVSTMX|         | P     P |C C C C C|         |         |c c c c c| p     p |         |xmtsvstmx'

  constructor(
    public chessService: XiangqiService,
    private playerService: GameService,
    private shareService: ShareService,
    public gameService: GameService,
    private AIService: AIService,
    private historyService: HistoryService,
    private dialog: MatDialog,
  ) {
    this.grap = this.historyService.newGrap();
    this.currentPlayer = this.playerService.getUserById(this.gameService.currentUserIDControll)
    this.chess = chessService.newChess()

    this.chessService.currenChessTable = this.chessService.createChessTable()
    this.chessService.currenChessTable = this.chessService.setTable(this.strBoard, this.chessService.currenChessTable, this.playerService.player1)
    this.table = chessService.currenChessTable
  }

  //cầm con cờ
  mousedownImg(e: any, chess: Chess) {
    if (!this.gameService.isGameStart) return
    if (this.gameService.getCurrentUser().isBOT) return
    this.clearTableEff()
    if (e.which != 1) return

    if (!this.gameService.isGameStart) {
      this.shareService.openSnackbar("Nhấn 'BẮT ĐẦU' để bắt đầu trận đấu", 'OK')
      return
    }
    this.currentPlayer = this.playerService.getUserById(this.gameService.currentUserIDControll)
    if (this.gameService.canPickChess(this.currentPlayer.chessControl.chessIDControl, chess.shotName)) {
      this.chess = chess
      let dots = this.chessService.getDots(chess, this.table)
      this.chessService.setDots(dots, this.table)
      this.chessService.setDotsbanToTable(this.chessService.getDotban(chess, this.table, dots), this.table)
    }
  }
  dragend(e: any, p: Position) {
    if (e.which != 1) {
      return
    }
  }

  //thả con cờ
  drag(ev: any) {
    ev.dataTransfer.setData("text", ev.target.id);
  }
  allowDrop(ev: Event) {
    ev.preventDefault();
  }
  drop(ev: any, p: Position) {
    ev.preventDefault();
    if (!this.gameService.isGameStart) return
    if (this.gameService.getCurrentUser().isBOT) return
    let fP = this.chess.position
    let isMove = this.chessService.move(this.chess, p, this.table)
    if (isMove) {
      this.fPosition = fP
      this.tPosition = p
      this.grap = this.historyService.newGrap();
      this.addGrap(this.fPosition, this.tPosition)

      this.gameService.getCurrentUser().chessControl.isCheckmat = false
      this.gameService.changeCurrentPlayer(this.playerService.player1, this.playerService.player2)

      let isCheckmat = this.chessService.isCheckmatAll(this.chess, this.table)
      if (isCheckmat) {
        this.gameService.getCurrentUser().chessControl.isCheckmat = true
      }
      this.chessService.setDrawOrWin(this.table, this.gameService.getCurrentUser())

      if (this.gameService.getCurrentUser().isBOT) {
        this.BOTMove()
      }
    }
    this.clearTableEff()
  }

  BOTMove() {
    this.AIService.setMoveOnBOT(this.grap.grapFrom + this.grap.grapTo).subscribe(async (dataRes: { moveTo: string }) => {
      if (dataRes != undefined) {
        let res = this.historyService.grapStrToPosition(dataRes.moveTo)
        await this.delay(2);
        this.chessService.moveNoDot(this.table[res.fromP.y][res.fromP.x].chess, res.toPosition, this.table)

        this.chess = this.table[res.toPosition.y][res.toPosition.x].chess

        this.fPosition = res.fromP
        this.tPosition = res.toPosition
        this.grap = this.historyService.newGrap();
        this.addGrap(this.fPosition, this.tPosition)

        this.gameService.getCurrentUser().chessControl.isCheckmat = false
        this.gameService.changeCurrentPlayer(this.playerService.player1, this.playerService.player2)

        let isCheckmat = this.chessService.isCheckmatAll(this.chess, this.table)
        if (isCheckmat) {
          this.gameService.getCurrentUser().chessControl.isCheckmat = true
        }
        this.chessService.setDrawOrWin(this.table, this.gameService.getCurrentUser())
      }
    })
  }

  clearTableEff() {
    this.chessService.clearTableDot(this.table)
  }

  addGrap(from: Position, to: Position) {
    this.grap.grapFrom = this.historyService.toFormatPosition(from);
    this.grap.grapTo = this.historyService.toFormatPosition(to);
    this.grap.nameChess = this.chess.chessImg;
    this.grap.uid = this.gameService.getCurrentUser().id;
    this.grap.id = Date.now().toString();
    this.historyService.addGrap(this.grap);
  }

  ngOnInit(): void {
    this.gameService.time.isTimeOut.subscribe((isTimeOut) => {

      console.log('hết giờ')
      this.gameService.changeCurrentPlayer(this.playerService.player1, this.playerService.player2)
      this.gameService.endGame(this.gameService.player1, this.gameService.player2)
      this.AIService.killFfish()

      if (isTimeOut == true) {
        this.dialog.open(DialogwingameComponent, {
          panelClass: 'dialogWin',
          width: '42em',
          data: this.gameService.getCurrentUser()
        });
      }
    });
    this.chessService.gameOver.subscribe(e => {
      if (e.isDraw) {
        // console.log('hoa co')
      } else {
        this.gameService.changeCurrentPlayer(this.playerService.player1, this.playerService.player2)
        this.dialog.open(DialogwingameComponent, {
          panelClass: 'dialogWin',
          width: '42em',
          data: this.gameService.getCurrentUser()
        });
      }

      this.gameService.endGame(this.gameService.player1, this.gameService.player2)
      this.AIService.killFfish()

    })
  }

  delay(second: number) {
    return new Promise(resolve => setTimeout(resolve, second * 1000));
  }
}

