import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {BMVService, IBrand, IModel, IVersion} from '../../../../services/b-m-v.service';
import {StaticDataService} from '../../../../services/static-data.service';
import {ApiService} from '../../../../services/api/api.service';
import {AlertsService} from 'angular-alert-module';
import {Router} from '@angular/router';

@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.css']
})
export class OfferListComponent implements OnInit {
  loading = false;
  offers: Array<IOfferItem>;

  constructor(
      private changeDetectorRef: ChangeDetectorRef,
      private apiService: ApiService,
      private alert: AlertsService,
  ) {
    this.apiService.getUserOfferList().then((value: any) => {
      this.offers = value.offerListByUserIdResult;
    });
  }

  ngOnInit() {
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
