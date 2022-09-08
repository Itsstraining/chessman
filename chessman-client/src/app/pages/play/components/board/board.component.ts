import { Component, OnInit } from '@angular/core';
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
  fPosition: Position = { x: -1, y: -1 }
  tPosition: Position = { x: -1, y: -1 }
  grap: Grap;

  constructor(
    public chessService: XiangqiService,
    private playerService: GameService,
    private shareService: ShareService,
    public gameService: GameService,
    private AIService: AIService,
    private historyService: HistoryService
  ) {
    this.grap = this.historyService.newGrap();
    this.currentPlayer = this.playerService.getUserById(this.gameService.currentUserIDControll)
    this.chess = chessService.newChess()

    this.chessService.currenChessTable = this.chessService.createChessTable()
    let strBoard = 'XMTSVSTMX|         | P     P |C C C C C|         |         |c c c c c| p     p |         |xmtsvstmx'

    // let strBoard = 'p  V     |    SM   |   cT    |   c    x|        c|         |         |t        | CC  C   |   vPMC  '

    this.chessService.currenChessTable = this.chessService.setTable(strBoard, this.chessService.currenChessTable, this.playerService.player1)
    this.table = chessService.currenChessTable
  }

  //cầm con cờ
  mousedownImg(e: any, chess: Chess) {
    this.clearTableEff()
    if (e.which != 1) {
      return
    }
    if (!this.gameService.isGameStart) {
      this.shareService.openSnackbar('Trận đấu chưa bắt đầu..', 'OK')
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
    this.AIService.setMove(this.grap.grapFrom + this.grap.grapTo).subscribe((e) => {
      if (e != undefined) {
        let str = e[this.AIService.getRandomInt(0,e.length)]
        console.log(str)
        let res = this.historyService.grapStrToPosition(str)
        console.log(res)
        this.chessService.moveNoDot(this.table[res.fromP.y][res.fromP.x].chess,res.toPosition,this.table)
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
      console.log('het gio')
      // this.gameService.endGame()
      // if (isTimeOut == true) {
      //   const dialogRef = this.dialog.open(DialogWinComponent, {
      //     panelClass: 'dialogWin',
      //     width: '42em',
      //   });
      //   dialogRef.afterClosed().subscribe(result => {
      //     console.log(`Dialog result: ${result}`);
      //   });
      // }
    });
    this.chessService.gameOver.subscribe(e => {
      // this.gameService.endGame()
      if (e.isDraw) {
        console.log('hoa co')

        // const dialogRef = this.dialog.open(DialogDrawComponent, {
        //   panelClass: 'dialogDraw',
        //   width: '42em',
        // });
        // dialogRef.afterClosed().subscribe(result => {
        //   console.log(`Dialog result: ${result}`);
        // });
      } else {
        console.log('het co')
        console.log(e.winer.name + ' is winer')
        // const dialogRef = this.dialog.open(DialogWinComponent, {
        //   panelClass: 'dialogWin',
        //   width: '42em',
        // });
        // dialogRef.afterClosed().subscribe(result => {
        //   console.log(`Dialog result: ${result}`);
        // });
      }
    })
  }
}

