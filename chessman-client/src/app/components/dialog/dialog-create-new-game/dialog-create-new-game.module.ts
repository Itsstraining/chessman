import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogCreateNewGameComponent } from './dialog-create-new-game.component';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule
  ],
  declarations: [
    DialogCreateNewGameComponent
  ],
  exports: [
    DialogCreateNewGameComponent
  ]
})
export class DialogNewGameModule { }
