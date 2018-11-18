import {Component} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'auto-oferty-web';
    openedLoginModal = false;
    openedRegisterModal = false;

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
}
