import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {ApiService} from '../../../../services/api/api.service';
import {AlertsService} from 'angular-alert-module';

@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.css']
})
export class OfferListComponent implements OnInit {
  loading = false;
  @Input()
  offers: Array<IOfferItem>;

  constructor(
      private changeDetectorRef: ChangeDetectorRef,
      private apiService: ApiService,
      private alert: AlertsService,
  ) {
  }

  loadOffers() {
    this.apiService.getUserOfferList().then((value: any) => {
      this.offers = value.offerListByUserIdResult;
    }).catch(reason => {
      console.error(reason);
    }).finally(() => {
      this.loading = false;
    });
  }

  ngOnInit() {
    this.loadOffers();
  }

  renew(id: number) {
    this.loading = true;
    this.apiService.renewOffer(id).then((value: any) => {
      if (value === true) {
        this.alert.setMessage('Oferta została odnowiona!', 'success');
        this.loadOffers();
      } else {
        this.alert.setMessage('Nie udało się przedłużyć czasu wygasania oferty!', 'error');
        this.loading = false;
      }
    }).catch(reason => {
      this.alert.setMessage('Nie udało się przedłużyć czasu wygasania oferty!', 'error');
      this.loading = false;
    });
  }

  remove(id: number) {
    this.loading = true;
    this.apiService.removeOffer(id).then((value: any) => {
      if (value === true) {
        this.alert.setMessage('Oferta została usunięta!', 'success');
        this.loadOffers();
      } else {
        this.alert.setMessage('Nie udało się usunąć oferty!', 'error');
        this.loading = false;
      }
    }).catch(reason => {
      this.alert.setMessage('Nie udało się usunąć oferty!', 'error');
      this.loading = false;
    });
  }

}

interface IOfferItem {
  id: number;
  name: string;
  photo: string;
  createDate: string;
  expireDate: string;
  viewCounter: number;
}
