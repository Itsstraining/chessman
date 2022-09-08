import { Injectable } from '@nestjs/common';
import * as ffish from 'ffish';
import { Move } from './models/move.model';

@Injectable()
export class AppService {
  board

  init(): string {
    this.board = new ffish.Board("xiangqi", "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR[] w - - 0 1");
    console.log(this.board.toVerboseString())
    return 'ffish init, I am ready!'
  }

  setMove(move: Move) {
    this.board.push(move.moveStr);
    let legalMoves: string[] = this.board.legalMoves().split(" ");
    return legalMoves
  }

  reset(){
    this.board.delete();
    this.board = new ffish.Board("xiangqi", "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR[] w - - 0 1");
    console.log(this.board.toVerboseString())
    return 'ffish init, I am ready!'
  }

}
