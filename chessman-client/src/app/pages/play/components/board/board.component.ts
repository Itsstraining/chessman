import { Component, OnInit } from '@angular/core';
import { Chess, ItemTable, Position } from 'src/app/models/chess.model';
import { Player } from 'src/app/models/player.model';
import { PlayerService } from 'src/app/services/player/player.service';
import { ShareService } from 'src/app/services/share.service';
import { XiangqiService } from 'src/app/services/xiangqi/xiangqi.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  table: ItemTable[][]
  tableEff: ItemTable[][]
  chess: Chess

  player1: Player
  player2: Player
  constructor(public xiangqiService: XiangqiService, private playerService: PlayerService) {
    this.tableEff = xiangqiService.createChessTable()
    this.chess = xiangqiService.newChess()
    this.player1 = this.playerService.newPlayer('user1','VHTMXC', true)
    this.player2 = this.playerService.newPlayer('user2','vhtmxc', false)

    this.xiangqiService.currenChessTable = this.xiangqiService.createChessTable()
    // let strBoard = 'xmtsvstmx|         | p     p |c c c c c|         |         |C C C C C| P     P |         |XMTSVSTMX'
    let strBoard = 'xmtsvstmx|         | p     p |c c c c c|         |         |C C C C C| P     P |         |XMTSVSTMX'
    this.xiangqiService.currenChessTable = this.xiangqiService.setTable(strBoard, this.xiangqiService.currenChessTable, this.player1)
    this.table = xiangqiService.currenChessTable
  }

  ngOnInit(): void {
  }

  //for chessItem
  mousedownImg(e: any, chess: Chess) {
    this.clearTableEff()
    if (e.which != 1) {
      return
    }
    this.chess = chess
    this.tableEff = this.xiangqiService.setTableEff(chess, this.table, this.tableEff)
  }
  dragend(e: any, p: Position) {
    if (e.which != 1) {
      return
    }
  }

  //for boxTable
  drag(ev: any) {
    ev.dataTransfer.setData("text", ev.target.id);
  }
  allowDrop(ev: Event) {
    ev.preventDefault();
  }
  drop(ev: any, p: Position) {
    ev.preventDefault();
    let isMove = this.xiangqiService.move(this.chess, p, this.table, this.tableEff)
    if (isMove) {
      var data = ev.dataTransfer.getData("text");
      ev.target.appendChild(document.getElementById(data));
    }
    else {
      if (this.chess.position != p)
        // this.snackService.openSnackbar('Nước đi không hợp lệ', 'OK')
        console.log('ko hop le')
    }
    this.clearTableEff()
  }

  clearTableEff() {
    this.tableEff = this.xiangqiService.createChessTable()
  }
}

