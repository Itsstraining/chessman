import { Injectable } from '@angular/core';
import { Chess, ItemTable, Position } from 'src/app/models/chess.model';
import { Player } from 'src/app/models/player.model';

@Injectable({
  providedIn: 'root'
})

export class XiangqiService {

  currenChessTable: Array<Array<ItemTable>> = []
  moves: Map<string, Position> = new Map()
  chessAsset: Map<string, Chess> = new Map()
  limitTable = {}

  constructor() {
    this.createMoves()
    this.createChessAsset()
  }


  //  xmtsvstmx|        | p    p |c c c c c|       |        |XMTSVSTMX|        | P    P |C C C C C
  setTable(txtTable: string, chessTable: ItemTable[][], player: Player): ItemTable[][] {
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
              if (this.isSameSide(temp.shotName, player.chessControl.chessID)) {
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
              res[i][j].haveChess = true
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
  move(chess: Chess, toPosition: Position, table: ItemTable[][], tableEff: ItemTable[][]): boolean {
    let fromP = chess.position
    if ((!(table[toPosition.y][toPosition.x].haveChess)) && tableEff[toPosition.y][toPosition.x].chess.shotName == '.') {
      table[fromP.y][fromP.x].haveChess = false
      table[fromP.y][fromP.x].chess = this.newChess()

      chess.position = toPosition
      table[toPosition.y][toPosition.x].haveChess = true
      table[toPosition.y][toPosition.x].chess = chess
      return true
    } else {
      return false
    }
  }

  setTableEff(chess: Chess, table: ItemTable[][], tableEff: ItemTable[][]) {
    let c = chess.position
    let ruleStr = ''

    if (chess.shotName.toLowerCase() == 'v') {
      ruleStr = '1 up/1 down/1 left/1 right'
    }
    else if (chess.shotName.toLowerCase() == 'x') {
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
          if (!this.onBoard({ x: (move1.x + boxTemp.x), y: (move1.y + boxTemp.y) })) {
            grapErr = true
            break
          }
          boxTemp = { x: (move1.x + boxTemp.x), y: (move1.y + boxTemp.y) }
          if (j == 0 && table[boxTemp.y][boxTemp.x].haveChess) {
            if (chess.shotName.toLowerCase() == 'm' || chess.shotName.toLowerCase() == 't') {
              grapErr = true
              break
            }
          }
        }
        //for

        if (chess.limit.xFrom != -1 || chess.limit.xTo != -1 || chess.limit.yFrom != -1 || chess.limit.yTo != -1) {
          if (chess.limit.yFrom != -1 && chess.limit.yTo != -1)
            if (!(boxTemp.y >= chess.limit.yFrom && boxTemp.y <= chess.limit.yTo)) {
              grapErr = true
            }
          if (chess.limit.xFrom != -1 && chess.limit.xTo != -1) {
            if (!(boxTemp.x >= chess.limit.xTo && boxTemp.x <= chess.limit.xTo)) {
              grapErr = true
            }
          }
        }
        if (!grapErr) {
          if (
            !table[boxTemp.y][boxTemp.x].haveChess ||
            (table[boxTemp.y][boxTemp.x].haveChess && !this.isSameSide(table[boxTemp.y][boxTemp.x].chess.shotName, chess.shotName))
          ) {
            tableEff[boxTemp.y][boxTemp.x].chess.shotName = '.'
          }
        }
      }
      else if (time == '*') {
        let pTemp = c
        let move1 = this.moves.get(grapStr) ?? { x: 0, y: 0 }
        let isStop = false
        let j = 0
        while (!isStop) {
          pTemp = { x: pTemp.x + move1.x, y: pTemp.y + move1.y }
          if (this.onBoard(pTemp)) {
            if (!table[pTemp.y][pTemp.x].haveChess) {
              tableEff[pTemp.y][pTemp.x].chess.shotName = '.'
            }
            else {
              if (!this.isSameSide(chess.shotName, table[pTemp.y][pTemp.x].chess.shotName)) {
                tableEff[pTemp.y][pTemp.x].chess.shotName = '.'
              }
              isStop = true
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
    return tableEff
  }
  isSameSide(c1: string, c2: string) {
    let c3 = c1 + c2
    return c3.toUpperCase() == c3 || c3.toLocaleLowerCase() == c3
  }
  onBoard(p: Position) {
    return p.x > -1 && p.y > -1 && p.x < 9 && p.y < 10
  }
  printChessTable(chessTable: ItemTable[][]) {
    console.log('------------------------------------')
    let res = ''
    try {
      for (let i = 0; i < 10; i++) {
        res = ''
        for (let j = 0; j < 9; j++) {
          chessTable[i][j].chess.shotName != '' ?
            res += ' | ' + chessTable[i][j].chess.shotName
            : res += ' |  '
        }
        console.log(res + ' | ')
      }
    } catch (error) {
      console.log(error)
    }
  }
  createChessTable(): Array<Array<ItemTable>> {
    let res: Array<Array<ItemTable>> = []
    for (let i = 0; i < 10; i++) {
      let temp = []
      for (let j = 0; j < 9; j++) {
        let itemTable: ItemTable = {
          id: '',
          position: {
            x: j,
            y: i
          },
          haveChess: false,
          chess: this.newChess()
        }
        temp.push(itemTable)
      }
      res.push(temp)
    }
    return res
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
}
