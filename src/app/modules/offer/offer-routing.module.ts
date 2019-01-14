import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {OfferComponent} from './offer/offer.component';

const routes: Routes = [
  {path: ':id', pathMatch: 'full', component: OfferComponent},
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfferRoutingModule { }
