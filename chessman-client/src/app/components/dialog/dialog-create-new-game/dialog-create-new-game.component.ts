import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { GameNew } from 'src/app/models/gameNew.model';

@Component({
  selector: 'app-dialog-create-new-game',
  templateUrl: './dialog-create-new-game.component.html',
  styleUrls: ['./dialog-create-new-game.component.scss']
})
export class DialogCreateNewGameComponent implements OnInit {

  game: GameNew = {
    isWithBot: true,
    tGian1Nuoc: 30,
    tGian1User: 15
  }

  minStepTime = 20
  maxStepTime = 60
  minGameTime = 10
  maxGameTime = 30

  constructor(private dialogRef: MatDialogRef<DialogCreateNewGameComponent>) {
  }

  ngOnInit(): void {
  }

  changeStyleGame() {
    this.game.isWithBot = !this.game.isWithBot
  }

  // changeSco() {
  //   this.newGame.coTinhDiem = !this.newGame.coTinhDiem
  // }

  formatLabel(value: number) {
    return Math.round(value);
  }

  closeAndSendData() {
    this.dialogRef.close(this.game)
  }
}
