import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DangkyComponent } from './dangky.component';

const routes: Routes = [{ path: '', component: DangkyComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DangkyRoutingModule { }
