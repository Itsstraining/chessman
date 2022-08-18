import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { XemComponent } from './xem.component';

const routes: Routes = [{ path: '', component: XemComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class XemRoutingModule { }
