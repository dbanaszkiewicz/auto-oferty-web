import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OfferRoutingModule } from './offer-routing.module';
import { OfferComponent } from './offer/offer.component';
import {ComponentsModule} from '../../components/components.module';
import {SwiperModule} from 'ngx-swiper-wrapper';

@NgModule({
  imports: [
    CommonModule,
    OfferRoutingModule,
    ComponentsModule,
    SwiperModule
  ],
  declarations: [OfferComponent]
})
export class OfferModule { }
