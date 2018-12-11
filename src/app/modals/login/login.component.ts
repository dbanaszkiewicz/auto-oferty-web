import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import * as $ from 'jquery';
import {AlertsService} from 'angular-alert-module';
import {UserService} from '../../services/user.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    animations: [
        trigger('dialog', [
            transition('void => *', [
                style({ opacity: 0 }),
                animate(200)
            ]),
            transition('* => void', [
                animate(150, style({ opacity: 0 }))
            ])
        ])
    ]
})
export class LoginComponent implements OnInit {

    @Input() closable = true;
    @Input() visible: boolean;
    @Output() registerModal: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() onClose: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() onLogin: EventEmitter<boolean> = new EventEmitter<boolean>();

    email: string;
    password: string;
    loading = false;

    constructor(
        private userService: UserService,
        private alerts: AlertsService
    ) { }

    ngOnInit() { }

    close($event: Event, checkIsClickedOnBackgroud: boolean = false) {
        if (checkIsClickedOnBackgroud) {
            if ($($event.target).closest('.card').length === 0) {
                this.visible = false;
                this.onClose.emit(true);
            }
        } else {
            this.visible = false;
            this.onClose.emit(true);
        }
    }
    openRegisterModal() {
        this.close(null, false);
        this.registerModal.emit(true);
    }

    login() {
        this.loading = true;
        this.userService.login(this.email, this.password).then((value) => {
            this.alerts.setMessage('Zostałeś zalogowany!', 'success');
            this.loading = false;
            this.onLogin.emit(true);
            this.close(null, false);
        }, reason => {
            this.alerts.setMessage(reason.error.error.message, 'error');
            this.loading = false;
        });
    }
}
