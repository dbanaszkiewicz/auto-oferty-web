import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../services/user.service';
import {AlertsService} from 'angular-alert-module';
import {NavigationEnd, Router} from '@angular/router';
import {ApiService} from '../../../services/api/api.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  tab = 'account-settings';
  loading = true;
  edit = 0;
  offers: any;

  constructor(private userService: UserService,
              private alerts: AlertsService,
              private apiService: ApiService,
              private router: Router) {
    this.checkIsUserLogged();
    this.router.events.subscribe(value => {
        if (value instanceof NavigationEnd) {
            if ( /^\/user\/edit\/[0-9]+$/.test(value.url)) {
                this.edit = +router.url.substr('/user/edit/'.length);
            } else {
                this.edit = 0;
            }
        }
    });
  }

  ngOnInit() {
  }

  checkIsUserLogged() {
      if (this.userService && this.userService.isLogged !== null) {
          if (this.userService.isLogged === false) {
              this.alerts.setMessage('Musisz się zalogować aby mieć dostęp do panelu użytkownika!', 'error');
              this.router.navigate(['/']);
          } else {
              this.loading = false;
          }
      } else {
          setTimeout(() => {this.checkIsUserLogged(); }, 100);
      }
  }

  changeTab(name) {
      if (name === 'offer-list') {
          this.apiService.getUserOfferList().then((value: any) => {
              this.offers = value.offerListByUserIdResult;
          }).catch(reason => {
              console.error(reason);
          });
      }
      this.tab = name;
  }

}
