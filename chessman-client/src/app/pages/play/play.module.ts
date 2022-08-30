import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayRoutingModule } from './play-routing.module';
import { PlayComponent } from './play.component';
import { BoardComponent } from './components/board/board.component';
import { BoxHistoryComponent } from './components/box-history/box-history.component';

@NgModule({
  declarations: [
    PlayComponent,
    BoardComponent,
    BoxHistoryComponent,
  ],
  imports: [
    CommonModule,
    PlayRoutingModule
  ]
})
export class PlayModule { }
