import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: 'info', loadChildren: () => import('./pages/info/info.module').then(m => m.InfoModule) }, 
{ path: 'info', loadChildren: () => import('./pages/info/info.module').then(m => m.InfoModule) },
{ path: 'game', loadChildren: () => import('./pages/game/game.module').then(m => m.GameModule) },
{ path: 'lobby', loadChildren: () => import('./pages/lobby/lobby.module').then(m => m.LobbyModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
