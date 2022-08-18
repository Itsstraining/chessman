import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DangkyRoutingModule } from './dangky-routing.module';
import { DangkyComponent } from './dangky.component';


@NgModule({
  declarations: [
    DangkyComponent
  ],
  imports: [
    CommonModule,
    DangkyRoutingModule
  ]
})
export class DangkyModule { }
