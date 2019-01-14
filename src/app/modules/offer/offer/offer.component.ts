import { Component, OnInit } from '@angular/core';
import {ApiService, OfferModel} from '../../../services/api/api.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {SwiperConfigInterface} from 'ngx-swiper-wrapper';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css']
})
export class OfferComponent implements OnInit {

  offer: OfferModel;
  loaded = false;
  private idParamSubscription: Subscription;

  config: SwiperConfigInterface = {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 0,
    keyboard: true,
    navigation: true,
    observer: true
  };

  constructor(
      private route: ActivatedRoute,
      private apiService: ApiService
  ) {
    this.idParamSubscription = this.route.params.subscribe(params => {
      this.apiService.getOffer(+params['id']).then(value => { // (+) converts string 'id' to a number
        this.offer = value;
        this.loaded = true;
        console.log(this.offer);
      }).catch(reason => {
        console.error(reason);
        this.loaded = true;
      });
    });
  }


  ngOnInit() {
    this.idParamSubscription.unsubscribe();
  }

}
