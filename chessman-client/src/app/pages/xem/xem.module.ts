import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { XemRoutingModule } from './xem-routing.module';
import { XemComponent } from './xem.component';


@NgModule({
  declarations: [
    XemComponent
  ],
  imports: [
    CommonModule,
    XemRoutingModule
  ]
})
export class XemModule { }
