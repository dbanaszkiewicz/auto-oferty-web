import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { MainComponent } from './main/main.component';
import { SettingsComponent } from './components/settings/settings.component';
import { OfferListComponent } from './components/offer-list/offer-list.component';
import { AddOfferComponent } from './components/add-offer/add-offer.component';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule
  ],
  declarations: [MainComponent, SettingsComponent, OfferListComponent, AddOfferComponent]
})
export class UserModule { }
