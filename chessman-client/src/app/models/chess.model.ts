export interface ItemTable {
  id: string
  position: Position
  haveChess: boolean
  chess: Chess
}

export interface Chess {
  id: string
  name:string
  shotName: string
  chessImg: string
  chessIconClass: string
  position: Position
  isPawnUp: boolean
  limitFrom: Position
  limitTo: Position
}

export interface Position {
  x: number
  y: number
}

