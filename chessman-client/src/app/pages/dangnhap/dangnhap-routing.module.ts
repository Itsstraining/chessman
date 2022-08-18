import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DangnhapComponent } from './dangnhap.component';

const routes: Routes = [{ path: '', component: DangnhapComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DangnhapRoutingModule { }
