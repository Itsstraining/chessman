import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomRoutingModule } from './room-routing.module';
import { RoomComponent } from './room.component';
import { MaterialModule } from 'src/app/material.module';
import { DialogCreateNewGameComponent } from 'src/app/components/dialog/dialog-create-new-game/dialog-create-new-game.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RoomComponent,
    DialogCreateNewGameComponent
  ],
  imports: [
    CommonModule,
    RoomRoutingModule,
    MaterialModule,
    FormsModule
  ]
})
export class RoomModule { }
