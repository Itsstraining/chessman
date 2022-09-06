import { Injectable } from '@angular/core';
import { Chess, Cell, Position } from 'src/app/models/chess.model';
import { Player } from 'src/app/models/player.model';
import { ShareService } from '../share.service';

@Injectable({
  providedIn: 'root'
})

export class XiangqiService {

  currenChessTable: Array<Array<Cell>> = []
  moves: Map<string, Position> = new Map()
  chessAsset: Map<string, Chess> = new Map()

  constructor(private shareService: ShareService) {
    this.createMoves()
    this.createChessAsset()
  }
  //  xmtsvstmx|        | p    p |c c c c c|       |        |XMTSVSTMX|        | P    P |C C C C C
  setTable(txtTable: string, chessTable: Cell[][], player: Player): Cell[][] {
    let res = [...chessTable]
    try {
      let rows = txtTable.split('|')
      for (let i = 0; i < 10; i++) {
        let chessTxtS = rows[i].split('')
        for (let j = 0; j < 9; j++) {
          if (chessTxtS[j] != ' ') {
            let temp = this.chessAsset.get(chessTxtS[j])
            if (temp != undefined) {
              //
              let isUp = false
              if (this.isAlly(temp.shotName, player.chessControl.chessIDControl)) {
                isUp = player.isBase
              }
              //

              if (temp.shotName.toLocaleLowerCase() == 'c') {
                temp.isPawnUp = isUp
              }
              else if (temp.shotName.toLocaleLowerCase() == 't') {
                if (isUp) {
                  temp.limit.yFrom = 5
                  temp.limit.yTo = 9
                }
                else {
                  temp.limit.yFrom = 0
                  temp.limit.yTo = 4
                }
              }
              else if (temp.shotName.toLocaleLowerCase() == 's' || temp.shotName.toLocaleLowerCase() == 'v') {
                if (isUp) {
                  temp.limit.yFrom = 7
                  temp.limit.yTo = 9
                  temp.limit.xFrom = 3
                  temp.limit.xTo = 5
                }
                else {
                  temp.limit.yFrom = 0
                  temp.limit.yTo = 2
                  temp.limit.xFrom = 3
                  temp.limit.xTo = 5
                }
              }

              let id = res[i][j].chess.id
              res[i][j].chess = { ...temp }
              if (id == '') {
                res[i][j].chess.id = temp.shotName + i + j
              }
              res[i][j].hasChess = true
              res[i][j].chess.position = res[i][j].position
            }
          }
          if (res[i][j].id == '') {
            res[i][j].id = `[${res[i][j].position.x},${res[i][j].position.y}]`
          }
        }
      }
    } catch (error) {
      console.log(error)
    }
    return res
  }
  move(chess: Chess, toPosition: Position, table: Cell[][]): boolean {
    let fromP = chess.position
    if (table[toPosition.y][toPosition.x].hasDot) {
      if (table[toPosition.y][toPosition.x].hasDotBan) {
        this.shareService.openSnackbar('Lỗi mất Tướng', 'OK')
        return false
      }
      table[fromP.y][fromP.x].hasChess = false
      table[fromP.y][fromP.x].chess = this.newChess()

      chess.position = toPosition
      table[toPosition.y][toPosition.x].hasChess = true
      table[toPosition.y][toPosition.x].chess = chess
      return true
    } else {
      if (toPosition != chess.position) {
        this.shareService.openSnackbar('Nước đi không hợp lệ!', 'OK');
      }
      return false
    }
  }
  moveNoDot(chess: Chess, toPosition: Position, table: Cell[][]) {
    let fromP = chess.position
    table[fromP.y][fromP.x].hasChess = false
    table[fromP.y][fromP.x].chess = this.newChess()

    chess.position = toPosition
    table[toPosition.y][toPosition.x].hasChess = true
    table[toPosition.y][toPosition.x].chess = chess
  }
  getDots(chess: Chess, table: Cell[][]) {
    let dots = []
    for (let i = 0; i < 10; i++) {
      dots.push(Array(9).fill(false))
    }
    let c = chess.position
    let ruleStr = ''
    if (chess.shotName.toLowerCase() == 'v') {
      ruleStr = '1 up/1 down/1 left/1 right'
    }
    else if (chess.shotName.toLowerCase() == 'x') {
      ruleStr = '* up/* down/* left/* right'
    }
    else if (chess.shotName.toLowerCase() == 'p') {
      ruleStr = '* up/* down/* left/* right'
    }
    else if (chess.shotName.toLowerCase() == 't') {
      ruleStr = '1 upleft-upleft/1 downleft-downleft/1 upright-upright/1 downright-downright'
    }
    else if (chess.shotName.toLowerCase() == 's') {
      ruleStr = '1 upleft/1 downleft/1 upright/1 downright'
    }
    else if (chess.shotName.toLowerCase() == 'm') {
      ruleStr = '1 up-up-right/1 up-up-left/1 left-left-up/1 left-left-down/1 down-down-left/1 down-down-right/1 right-right-up/1 right-right-down'
    }
    else if (chess.shotName.toLowerCase() == 'c') {
      let baseStr = ''
      chess.isPawnUp ? baseStr = 'up' : baseStr = 'down'
      ruleStr = '1 ' + baseStr
      if (chess.isPawnUp) {
        if (chess.position.y < 5) {
          ruleStr += `/1 left/1 right`
        }
      } else {
        if (chess.position.y > 4) {
          ruleStr += `/1 left/1 right`
        }
      }
    }
    let temp = ruleStr.split('/')
    for (let i = 0; i < temp.length; i++) {
      let [time, grapStr] = temp[i].split(' ')
      if (time == '1') {
        let graps = grapStr.split('-')
        let boxTemp = c
        let grapErr = false
        //for
        for (let j = 0; j < graps.length; j++) {
          let move1 = this.moves.get(graps[j]) ?? { x: 0, y: 0 }
          if (!this.onLimit({ x: (move1.x + boxTemp.x), y: (move1.y + boxTemp.y) })) {
            grapErr = true
            break
          }
          boxTemp = { x: (move1.x + boxTemp.x), y: (move1.y + boxTemp.y) }
          if (j == 0 && table[boxTemp.y][boxTemp.x].hasChess) {
            if (chess.shotName.toLowerCase() == 'm' || chess.shotName.toLowerCase() == 't') {
              grapErr = true
              break
            }
          }
        }
        //for
        if (chess.shotName.toLowerCase() == 't') {
          if (!(boxTemp.y >= chess.limit.yFrom && boxTemp.y <= chess.limit.yTo)) {
            grapErr = true
          }
        }
        else if (chess.shotName.toLowerCase() == 's' || chess.shotName.toLowerCase() == 'v') {
          if (!(boxTemp.x >= chess.limit.xFrom && boxTemp.x <= chess.limit.xTo && boxTemp.y >= chess.limit.yFrom && boxTemp.y <= chess.limit.yTo)) {
            grapErr = true
          }
        }

        if (!grapErr) {
          if (
            !table[boxTemp.y][boxTemp.x].hasChess ||
            (table[boxTemp.y][boxTemp.x].hasChess && !this.isAlly(table[boxTemp.y][boxTemp.x].chess.shotName, chess.shotName))
          ) {
            dots[boxTemp.y][boxTemp.x] = true
          }
        }
      }
      else if (time == '*') {
        let pTemp = c
        let move1 = this.moves.get(grapStr) ?? { x: 0, y: 0 }
        let isStop = false
        let j = 0
        let stepOfCannon = false
        while (!isStop) {
          pTemp = { x: pTemp.x + move1.x, y: pTemp.y + move1.y }
          if (this.onLimit(pTemp)) {
            if (!table[pTemp.y][pTemp.x].hasChess && !stepOfCannon) {
              dots[pTemp.y][pTemp.x] = true
            }
            else {
              if (chess.shotName.toLowerCase() == 'p') {
                if (!stepOfCannon) {
                  stepOfCannon = true
                }
                else {
                  if (!this.isAlly(chess.shotName, table[pTemp.y][pTemp.x].chess.shotName)) {
                    dots[pTemp.y][pTemp.x] = true
                    isStop = true
                  }
                }
              }
              else {
                if (!this.isAlly(chess.shotName, table[pTemp.y][pTemp.x].chess.shotName)) {
                  dots[pTemp.y][pTemp.x] = true
                }
                isStop = true
              }
            }
          } else {
            isStop = true
          }
          j++
          if (j > 20) {
            console.log('lap vo tan')
            break
          }
        }
      }
    }
    return dots
  }
  setDots(dots: boolean[][], table: Cell[][]) {
    for (let i = 0; i < dots.length; i++) {
      for (let j = 0; j < dots[i].length; j++) {
        if (dots[i][j] == true) {
          table[i][j].hasDot = true
        }
      }
    }
  }
  isAlly(c1: string, c2: string) {
    let c3 = c1 + c2
    return c3.toUpperCase() == c3 || c3.toLocaleLowerCase() == c3
  }
  onLimit(p: Position) {
    return p.x > -1 && p.y > -1 && p.x < 9 && p.y < 10
  }
  isCheckmat(chess: Chess, table: Cell[][]) {
    let res = false
    let dots = this.getDots(chess, table)
    for (let i = 0; i < dots.length; i++) {
      for (let j = 0; j < dots[i].length; j++) {
        if (dots[i][j] && table[i][j].chess.shotName.toLowerCase() == 'v') {
          res = true
        }
      }
    }
    return res
  }
  isCheckmatAll(chessEnemy: Chess, table: Cell[][]): boolean {
    for (let i = 0; i < table.length; i++) {
      for (let j = 0; j < table[i].length; j++) {
        if (this.isAlly(chessEnemy.shotName, table[i][j].chess.shotName)) {
          console.log(chessEnemy.shotName)
          if (this.isCheckmat(table[i][j].chess, table)) {
            return true
          }
        }
      }
    }
    return false
  }
  getDotban(chess1: Chess, table: Cell[][], dots: boolean[][]): boolean[][] {
    let chess = { ...chess1 }
    let tableCopy: Cell[][] = []
    table.forEach((e) => {
      let arr: Cell[] = []
      e.forEach(cell => {
        arr.push({ ...cell })
      })
      tableCopy.push(arr)
    })
    let dotsban: boolean[][] = []
    for (let i = 0; i < 10; i++) {
      dotsban.push(Array(9).fill(false))
    }
    for (let i = 0; i < dots.length; i++) {
      for (let j = 0; j < dots[i].length; j++) {
        if (dots[i][j]) {
          let cell = { ...tableCopy[i][j] }
          this.moveNoDot(chess, { x: j, y: i }, tableCopy)
          let breakForiijj = false
          for (let ii = 0; ii < tableCopy.length; ii++) {
            if (breakForiijj) break
            for (let jj = 0; jj < tableCopy[ii].length; jj++) {
              if (breakForiijj) break
              if (
                tableCopy[ii][jj].hasChess &&
                !this.isAlly(chess.shotName, tableCopy[ii][jj].chess.shotName) &&
                this.isCheckmat(tableCopy[ii][jj].chess, tableCopy)) {
                dotsban[i][j] = true
                breakForiijj = true
              }
            }
          }
          this.moveNoDot(chess, chess1.position, tableCopy)
          tableCopy[i][j].hasChess = cell.hasChess
          if (cell.hasChess) {
            tableCopy[i][j].chess = cell.chess
          }
        }
      }
    }

    if (chess1.shotName.toLowerCase() == 'v') {
      if (dotsban[0][3]) dotsban[0][2] = true
      else if (dotsban[0][5]) dotsban[0][6] = true
      else if (dotsban[7][3]) dotsban[7][2] = true
      else if (dotsban[7][5]) dotsban[7][6] = true
    }

    return dotsban
  }
  setDotsbanToTable(dotsban: boolean[][], table: Cell[][]) {
    for (let i = 0; i < dotsban.length; i++) {
      for (let j = 0; j < dotsban[i].length; j++) {
        if (dotsban[i][j] == true) {
          table[i][j].hasDotBan = true
        }
      }
    }
  }




  printChessTable(chessTable: Cell[][]) {
    console.log('------------------------------------')
    let res = ''
    try {
      for (let i = 0; i < 10; i++) {
        res = ''
        for (let j = 0; j < 9; j++) {
          chessTable[i][j].hasChess ?
            res += ' | ' + (chessTable[i][j].hasDot ? '.' : chessTable[i][j].hasDotBan ? 'x' : '')
            // res += ' | ' + chessTable[i][j].chess.shotName
            : res += ' |  '
        }
        console.log(res + ' | ')
      }
    } catch (error) {
      console.log(error)
    }
  }
  createChessTable(): Array<Array<Cell>> {
    let res: Array<Array<Cell>> = []
    for (let i = 0; i < 10; i++) {
      let temp = []
      for (let j = 0; j < 9; j++) {

        temp.push(this.newItemTable(i, j))
      }
      res.push(temp)
    }
    return res
  }
  clearTableDot(table: Cell[][]) {
    for (let i = 0; i < table.length; i++) {
      for (let j = 0; j < table[i].length; j++) {
        table[i][j].hasDot = false
        table[i][j].hasDotBan = false
      }
    }
  }
  createMoves() {
    // for dựa trên i j tạo ra bàn cờ
    // => j là chiều ngang tương ứng với trục hoành x
    this.moves.set('up', { x: 0, y: -1 })
    this.moves.set('down', { x: 0, y: 1 })
    this.moves.set('left', { x: -1, y: 0 })
    this.moves.set('right', { x: 1, y: 0 })

    this.moves.set('upright', { x: 1, y: -1 })
    this.moves.set('downright', { x: 1, y: 1 })
    this.moves.set('upleft', { x: -1, y: -1 })
    this.moves.set('downleft', { x: -1, y: 1 })
  }
  createChessAsset() {
    this.chessAsset.set('p', {
      id: '',
      name: 'phao',
      shotName: 'p',
      chessImg: 'wca.png',
      chessIconClass: 'fi-sr-chess-king',
      position: {
        x: -1,
        y: -1
      },
      isPawnUp: false,
      limit: {
        xFrom: -1,
        xTo: -1,
        yFrom: -1,
        yTo: -1,
      },
    }),
      this.chessAsset.set('v', {
        id: '',
        name: 'king',
        shotName: 'v',
        chessImg: 'wk.png',
        chessIconClass: 'fi-sr-chess-king',
        position: {
          x: -1,
          y: -1
        },
        isPawnUp: false,
        limit: {
          xFrom: -1,
          xTo: -1,
          yFrom: -1,
          yTo: -1,
        },
      })
    this.chessAsset.set('s', {
      id: '',
      name: 'si',
      shotName: 's',
      chessImg: 'wa.png',
      chessIconClass: 'fi-sr-chess-queen',
      position: {
        x: -1,
        y: -1
      },
      isPawnUp: false,
      limit: {
        xFrom: -1,
        xTo: -1,
        yFrom: -1,
        yTo: -1,
      },
    })
    this.chessAsset.set('t', {
      id: '',
      name: 'bishop',
      shotName: 't',
      chessImg: 'we.png',
      chessIconClass: 'fi-sr-chess-bishop',
      position: {
        x: -1,
        y: -1
      },
      isPawnUp: false,
      limit: {
        xFrom: -1,
        xTo: -1,
        yFrom: -1,
        yTo: -1,
      },
    })
    this.chessAsset.set('m', {
      id: '',
      name: 'knight',
      shotName: 'm',
      chessImg: 'wn.png',
      chessIconClass: 'fi-sr-chess-knight-alt',
      position: {
        x: -1,
        y: -1
      },
      isPawnUp: false,
      limit: {
        xFrom: -1,
        xTo: -1,
        yFrom: -1,
        yTo: -1,
      },
    })
    this.chessAsset.set('x', {
      id: '',
      name: 'rook',
      shotName: 'x',
      chessImg: 'wc.png',
      chessIconClass: 'fi-sr-chess-rook-alt',
      position: {
        x: -1,
        y: -1
      },
      isPawnUp: false,
      limit: {
        xFrom: -1,
        xTo: -1,
        yFrom: -1,
        yTo: -1,
      },
    })
    this.chessAsset.set('c', {
      id: '',
      name: 'pawn',
      shotName: 'c',
      chessImg: 'wp.png',
      chessIconClass: 'fi-sr-chess-pawn-alt',
      position: {
        x: -1,
        y: -1
      },
      isPawnUp: false,
      limit: {
        xFrom: -1,
        xTo: -1,
        yFrom: -1,
        yTo: -1,
      },
    })
    this.chessAsset.set('V', {
      id: '',
      name: 'king',
      shotName: 'V',
      chessImg: 'bk.png',
      chessIconClass: 'fi-sr-chess-king',
      position: {
        x: -1,
        y: -1
      },
      isPawnUp: false,
      limit: {
        xFrom: -1,
        xTo: -1,
        yFrom: -1,
        yTo: -1,
      },
    })
    this.chessAsset.set('S', {
      id: '',
      name: 'si',
      shotName: 'S',
      chessImg: 'ba.png',
      chessIconClass: 'fi-sr-chess-queen',
      position: {
        x: -1,
        y: -1
      },
      isPawnUp: false,
      limit: {
        xFrom: -1,
        xTo: -1,
        yFrom: -1,
        yTo: -1,
      },
    })
    this.chessAsset.set('T', {
      id: '',
      name: 'bishop',
      shotName: 'T',
      chessImg: 'be.png',
      chessIconClass: 'fi-sr-chess-bishop',
      position: {
        x: -1,
        y: -1
      },
      isPawnUp: false,
      limit: {
        xFrom: -1,
        xTo: -1,
        yFrom: -1,
        yTo: -1,
      },
    })
    this.chessAsset.set('M', {
      id: '',
      name: 'knight',
      shotName: 'M',
      chessImg: 'bn.png',
      chessIconClass: 'fi-sr-chess-knight-alt',
      position: {
        x: -1,
        y: -1
      },
      isPawnUp: false,
      limit: {
        xFrom: -1,
        xTo: -1,
        yFrom: -1,
        yTo: -1,
      },
    })
    this.chessAsset.set('X', {
      id: '',
      name: 'rook',
      shotName: 'X',
      chessImg: 'bc.png',
      chessIconClass: 'fi-sr-chess-rook-alt',
      position: {
        x: -1,
        y: -1
      },
      isPawnUp: false,
      limit: {
        xFrom: -1,
        xTo: -1,
        yFrom: -1,
        yTo: -1,
      },
    })
    this.chessAsset.set('C', {
      id: '',
      name: 'pawn',
      shotName: 'C',
      chessImg: 'bp.png',
      chessIconClass: 'fi-sr-chess-pawn-alt',
      position: {
        x: -1,
        y: -1
      },
      isPawnUp: false,
      limit: {
        xFrom: -1,
        xTo: -1,
        yFrom: -1,
        yTo: -1,
      },
    })
    this.chessAsset.set('P', {
      id: '',
      name: 'phao',
      shotName: 'P',
      chessImg: 'bca.png',
      chessIconClass: 'fi-sr-chess-king',
      position: {
        x: -1,
        y: -1
      },
      isPawnUp: false,
      limit: {
        xFrom: -1,
        xTo: -1,
        yFrom: -1,
        yTo: -1,
      },
    })
  }
  newChess() {
    let chess: Chess = {
      id: '',
      name: '',
      shotName: '',
      chessImg: '',
      chessIconClass: '',
      position: {
        x: -1,
        y: -1
      },
      isPawnUp: false,
      limit: {
        xFrom: -1,
        xTo: -1,
        yFrom: -1,
        yTo: -1,
      },
    }
    return chess
  }
  newItemTable(i: number, j: number) {
    let itemTable: Cell = {
      id: '',
      position: {
        x: j,
        y: i
      },
      hasDot: false,
      hasDotBan: false,
      hasChess: false,
      chess: this.newChess()
    }
    return itemTable
  }
}
