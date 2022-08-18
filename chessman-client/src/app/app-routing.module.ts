import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'dangnhap', loadChildren: () => import('./pages/dangnhap/dangnhap.module').then(m => m.DangnhapModule) },
  { path: 'menu', loadChildren: () => import('./pages/menu/menu.module').then(m => m.MenuModule) }, 
  { path: 'xem', loadChildren: () => import('./pages/xem/xem.module').then(m => m.XemModule) }, 
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) }, 
  { path: 'dangky', loadChildren: () => import('./pages/dangky/dangky.module').then(m => m.DangkyModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
