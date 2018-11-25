import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainPageComponent} from '../../components/main-page/main-page.component';
import {MainComponent} from './main/main.component';

const routes: Routes = [
    {path: '**', component: MainComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
