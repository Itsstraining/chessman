import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CacthecoComponent } from './cactheco.component';

const routes: Routes = [{ path: '', component: CacthecoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CacthecoRoutingModule { }
