import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CacthecoRoutingModule } from './cactheco-routing.module';
import { CacthecoComponent } from './cactheco.component';


@NgModule({
  declarations: [
    CacthecoComponent
  ],
  imports: [
    CommonModule,
    CacthecoRoutingModule
  ]
})
export class CacthecoModule { }
