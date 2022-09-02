import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Home1RoutingModule } from './home1-routing.module';
import { Home1Component } from './home1.component';


@NgModule({
  declarations: [
    Home1Component
  ],
  imports: [
    CommonModule,
    Home1RoutingModule
  ]
})
export class Home1Module { }
