import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogCreateNewGameComponent } from 'src/app/components/dialog/dialog-create-new-game/dialog-create-new-game.component';
import { DialogGameoverComponent } from 'src/app/components/dialog/dialog-gameover/dialog-gameover.component';
import { DialogwingameComponent } from '../../components/dialog/dialogwingame/dialogwingame.component';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {
  dataRoom = [
    {
      name: 'Thanh Do',
      rank: '1234',
      timeMin: 25,
      conntryImg: 'vn',
      avatarImg: 'a1'
    },
    {
      name: 'Van Teo',
      rank: '2123',
      timeMin: 25,
      conntryImg: 'pk',
      avatarImg: 'a1'
    },
    {
      name: 'Tom',
      rank: '3121',
      timeMin: 25,
      conntryImg: 'mx',
      avatarImg: 'a4'
    },
    {
      name: 'Hoang',
      rank: '4111',
      timeMin: 25,
      conntryImg: 'cn',
      avatarImg: 'a2'
    },
    {
      name: 'Binh Bo',
      rank: '5111',
      timeMin: 25,
      conntryImg: 'cn',
      avatarImg: 'a2'
    },
    {
      name: 'Thanh Do',
      rank: '6012',
      timeMin: 25,
      conntryImg: 'vn',
      avatarImg: 'a5'
    },
    {
      name: 'Thanh Do',
      rank: '7011',
      timeMin: 25,
      conntryImg: 'vn',
      avatarImg: 'a1'
    },
    {
      name: 'Thanh Do',
      rank: '7711',
      timeMin: 25,
      conntryImg: 'vn',
      avatarImg: 'a2'
    },
    {
      name: 'Thanh Do',
      rank: '7881',
      timeMin: 25,
      conntryImg: 'vn',
      avatarImg: 'a4'
    },
    {
      name: 'Thanh Do',
      rank: '7991',
      timeMin: 25,
      conntryImg: 'vn',
      avatarImg: 'a5'
    },
  ]
  dataBot = [
    {
      name: 'Thanh Do',
      lv: '1',

      conntryImg: 'vn',
      avatarImg: 'a1'
    },
    {
      name: 'Van Teo',
      lv: '2',

      conntryImg: 'pk',
      avatarImg: 'a1'
    },
    {
      name: 'Tom',
      lv: '3',

      conntryImg: 'mx',
      avatarImg: 'a4'
    },
    {
      name: 'Hoang',
      lv: '4',

      conntryImg: 'cn',
      avatarImg: 'a2'
    },
    {
      name: 'Binh Bo',
      lv: '5',

      conntryImg: 'cn',
      avatarImg: 'a1'
    },
    {
      name: 'Thanh Do',
      lv: '6',

      conntryImg: 'vn',
      avatarImg: 'a5'
    },
    {
      name: 'Thanh Do',
      lv: '7',

      conntryImg: 'vn',
      avatarImg: 'a4'
    },
    {
      name: 'Thanh Do',
      lv: '8',

      conntryImg: 'vn',
      avatarImg: 'a3'
    },
    {
      name: 'Thanh Do',
      lv: '9',

      conntryImg: 'vn',
      avatarImg: 'a2'
    },
    {
      name: 'Thanh Do',
      lv: '10',

      conntryImg: 'vn',
      avatarImg: 'a1'
    },
  ]
  dataWatch = [
    {
      p1: {
        name: 'Thanh Do',
        rank: '1234',

        conntryImg: 'vn',
        avatarImg: 'a2'
      },
      p2: {
        name: 'Thanh Do',
        rank: '1234',

        conntryImg: 'vn',
        avatarImg: 'a1'
      },
      views: 10,
      countStep: 34,
      minAgo: 10
    },
    {
      p1: {
        name: 'Thanh Do',
        rank: '1234',

        conntryImg: 'vn',
        avatarImg: 'a2'
      },
      p2: {
        name: 'Thanh Do',
        rank: '1234',

        conntryImg: 'vn',
        avatarImg: 'a1'
      },
      views: 10,
      countStep: 34,
      minAgo: 10
    },
    {
      p1: {
        name: 'Thanh Do',
        rank: '1234',

        conntryImg: 'vn',
        avatarImg: 'a2'
      },
      p2: {
        name: 'Thanh Do',
        rank: '1234',

        conntryImg: 'vn',
        avatarImg: 'a1'
      },
      views: 10,
      countStep: 34,
      minAgo: 10
    },
    {
      p1: {
        name: 'Thanh Do',
        rank: '1234',

        conntryImg: 'vn',
        avatarImg: 'a2'
      },
      p2: {
        name: 'Thanh Do',
        rank: '1234',

        conntryImg: 'vn',
        avatarImg: 'a1'
      },
      views: 10,
      countStep: 34,
      minAgo: 10
    },
    {
      p1: {
        name: 'Thanh Do',
        rank: '1234',
        conntryImg: 'vn',
        avatarImg: 'a2'
      },
      p2: {
        name: 'Thanh Do',
        rank: '1234',
        conntryImg: 'vn',
        avatarImg: 'a1'
      },
      views: 10,
      countStep: 34,
      minAgo: 10
    },
    {
      p1: {
        name: 'HoangMing',
        rank: '1414',
        conntryImg: 'cn',
        avatarImg: 'a2'
      },
      p2: {
        name: 'Thanh Do',
        rank: '6122',
        conntryImg: 'vn',
        avatarImg: 'a1'
      },
      views: 10,
      countStep: 34,
      minAgo: 10
    }
  ]
  constructor(public dialog: MatDialog) {
    
  }

  ngOnInit(): void {
  }

  openDialogCreateGame() {
    this.dialog.open(DialogwingameComponent);
    // this.dialog.open(DialogCreateNewGameComponent);

  }
  open(){
    this.dialog.open(DialogGameoverComponent);
    
  }

}
