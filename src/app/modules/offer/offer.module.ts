import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OfferRoutingModule } from './offer-routing.module';
import { OfferComponent } from './offer/offer.component';

@NgModule({
  imports: [
    CommonModule,
    OfferRoutingModule
  ],
  declarations: [OfferComponent]
})
export class OfferModule { }
