export interface Player{
  id: string
  name: string
  elo: number
  img: string
  isBase: boolean
  chessControl: ChessControl
}

export interface ChessControl{
  chessID: string
  currentCount: number
}
