import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListComponent} from './list/list.component';

const routes: Routes = [
  {path: ':brand/:model/:version', pathMatch: 'full', component: ListComponent},
  {path: ':brand/:model', pathMatch: 'full', component: ListComponent},
  {path: ':brand', pathMatch: 'full', component: ListComponent},
  {path: '**', component: ListComponent}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListRoutingModule { }
