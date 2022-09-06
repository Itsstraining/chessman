import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog-create-new-game',
  templateUrl: './dialog-create-new-game.component.html',
  styleUrls: ['./dialog-create-new-game.component.scss']
})
export class DialogCreateNewGameComponent implements OnInit {

  newGame: any
  minStepTime = 20
  currentStepTime = 30
  maxStepTime = 60
  minGameTime = 10
  currentGameTime = 15
  maxGameTime = 30

  constructor() {
    this.newGame = {
      laPhongCongDong: true,
      coTinhDiem: false,
      tGian1Nuoc: 30,
      tGian1User: 15
    }
  }

  ngOnInit(): void {
  }

  changeStyleGame(){
    this.newGame.laPhongCongDong = !this.newGame.laPhongCongDong
  }

  changeSco(){
    this.newGame.coTinhDiem = !this.newGame.coTinhDiem
  }

  a(num:number){
    console.log(num)
  }

  formatLabel(value: number) {
    return Math.round(value);
  }
}
