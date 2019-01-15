import {Component} from '@angular/core';
import {UserData, UserService} from './services/user.service';
import {AlertsComponent, AlertsModule, AlertsService} from 'angular-alert-module';
import {AlertsConfigData} from 'angular-alert-module/lib/alerts.config';
import {NavigationExtras, Router} from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'auto-oferty-web';
    openedLoginModal = false;
    openedRegisterModal = false;
    user: UserData = new UserData();
    isLogged;

    constructor(
        private userService: UserService,
        private alerts: AlertsService,
        private router: Router) {
        this.userService.fetchUserData().then(() => {
            this.updateUserInfoFromService();
        }).catch(reason => {
            console.error(reason);
        });

        setInterval(() => {
            $('input').trigger('change');
        }, 100);
    }

    openLoginModal() {
        this.openedLoginModal = true;
    }

    openRegisterModal() {
        this.openedRegisterModal = true;
    }

    onCloseLoginModal() {
        this.openedLoginModal = false;
    }

    onCloseRegisterModal() {
        this.openedRegisterModal = false;
    }

    onLogin() {
        this.userService.fetchUserData().then(() => {
            this.updateUserInfoFromService();
        }).catch(reason => {
            console.error(reason);
        });
    }

    logout() {
        this.userService.logout().then(() => {
            this.updateUserInfoFromService();
            this.alerts.setMessage('Wylogowano...', 'success');
        }).catch(reason => {
            console.error(reason);
        });

        this.router.navigate(['/'], {queryParams: []} as NavigationExtras);
    }

    private updateUserInfoFromService() {
        this.user = this.userService.userData;
        this.isLogged = this.userService.isLogged;
    }
}
