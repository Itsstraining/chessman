import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DangnhapRoutingModule } from './dangnhap-routing.module';
import { DangnhapComponent } from './dangnhap.component';


@NgModule({
  declarations: [
    DangnhapComponent
  ],
  imports: [
    CommonModule,
    DangnhapRoutingModule,
    
  ]
})
export class DangnhapModule { }
