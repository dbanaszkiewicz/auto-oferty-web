import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainPageComponent} from './components/main-page/main-page.component';

const routes: Routes = [
    {
        path: 'user',
        loadChildren: './modules/user/user.module#UserModule'
    },
    {
        path: 'offer',
        pathMatch: 'prefix',
        loadChildren: './modules/offer/offer.module#OfferModule'
    },
    {
        path: 'find',
        pathMatch: 'prefix',
        loadChildren: './modules/list/list.module#ListModule'
    },
    {path: '**', component: MainPageComponent}
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
