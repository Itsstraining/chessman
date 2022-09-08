import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomRoutingModule } from './room-routing.module';
import { RoomComponent } from './room.component';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule } from '@angular/forms';
import { DialogNewGameModule } from 'src/app/components/dialog/dialog-create-new-game/dialog-create-new-game.module';


@NgModule({
  declarations: [
    RoomComponent,
  ],
  imports: [
    CommonModule,
    RoomRoutingModule,
    MaterialModule,
    FormsModule,
    DialogNewGameModule
  ]
})
export class RoomModule { }
