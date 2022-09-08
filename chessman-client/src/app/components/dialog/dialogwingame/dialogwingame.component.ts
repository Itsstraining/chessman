import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-dialogwingame',
  templateUrl: './dialogwingame.component.html',
  styleUrls: ['./dialogwingame.component.scss']
})
export class DialogwingameComponent implements OnInit {

  constructor(public authSevice:AuthService, public dialog: MatDialog ) { }

  ngOnInit(): void {
  }

  close(){
    this.dialog.closeAll()
  }

}
