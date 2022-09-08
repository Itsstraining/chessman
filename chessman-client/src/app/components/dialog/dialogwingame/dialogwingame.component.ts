import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { GameService } from 'src/app/services/game/game.service';
import { user } from '../../../models/user.model'


@Component({
  selector: 'app-dialogwingame',
  templateUrl: './dialogwingame.component.html',
  styleUrls: ['./dialogwingame.component.scss']
})
export class DialogwingameComponent implements OnInit {

  constructor(public dialog: MatDialog, public gameService: GameService, @Inject(MAT_DIALOG_DATA) public user: user) { }

  ngOnInit(): void {
  }

  close() {
    this.dialog.closeAll()
  }

}
