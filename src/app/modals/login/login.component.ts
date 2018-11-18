import {Component, OnInit, Input, Output, OnChanges, EventEmitter, HostListener} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import * as $ from 'jquery';
import {ApiService} from '../../services/api/api.service';
import {AlertsService} from 'angular-alert-module';

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

    email: string;
    password: string;
    loading = false;

    constructor(
        private apiService: ApiService,
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
        this.apiService.userLogin(this.email, this.password).toPromise().then((value) => {
            alert('Zostałeś zalogowany!');
            this.loading = false;
            this.close(null, false);
        }, reason => {
            this.alerts.setDefaults('timeout', 0);
            this.alerts.setMessage(reason.error.error.message, 'error');
            this.loading = false;
        });
    }
}
