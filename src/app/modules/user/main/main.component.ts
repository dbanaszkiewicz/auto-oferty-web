import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../services/user.service';
import {AlertsService} from 'angular-alert-module';
import {Router} from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  tab = 'account-settings';
  loading = true;

  constructor(private userService: UserService,
              private alerts: AlertsService,
              private router: Router) {
    this.checkIsUserLogged();
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
      this.tab = name;
  }

}
