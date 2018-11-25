import {Component, OnInit, Input, Output, OnChanges, EventEmitter, HostListener, ChangeDetectorRef} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import * as $ from 'jquery';
import {AlertsService} from 'angular-alert-module';
import {Equals, IsAlpha, IsEmail, IsOptional, Matches, MinLength, validate, ValidationError} from 'class-validator';
import {serialize} from '../../tools/tools';
import {ApiService} from '../../services/api/api.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
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
export class RegisterComponent implements OnInit {

    @Input() closable = true;
    @Input() visible: boolean;
    @Output() loginModal: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() onClose: EventEmitter<boolean> = new EventEmitter<boolean>();

    formErrors: any;
    rd: RegisterData;
    loading = false;
    validated = false;

    constructor(private alerts: AlertsService,
    private changeDetectorRef: ChangeDetectorRef,
                private apiService: ApiService) {
        this.formErrors = {};
        this.rd = new RegisterData();
    }

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

    openLoginModal() {
        this.close(null, false);
        this.loginModal.emit(true);
    }

    register($event: Event) {
        this.loading = true;
        $event.preventDefault();
        console.log(this.rd);
        validate(this.rd).then((errors: Array<ValidationError>) => {
            this.formErrors = serialize(errors);
        });

        if (this.rd.password !== this.rd.password2) {
            console.log('others!!!!');
            this.formErrors.password2 = ['Podane hasła są różne!'];
            this.changeDetectorRef.detectChanges();
        }

        this.validated = true;

        if (Object.keys(this.formErrors).length === 0) {
            this.apiService.register(this.rd.email, this.rd.name, this.rd.password).then(value => {
                this.alerts.setMessage('Konto zostało założone. Możesz już się zalogować!', 'success');
                this.loading = false;
                this.close(null);
            }, reason => {
                this.alerts.setMessage(reason.error.error.message, 'error');
                this.loading = false;
            });
        } else {
            this.loading = false;
        }
    }
}

    class RegisterData {
        @IsAlpha({message: 'Podane imię jest nieprawidłowe!'})
        @MinLength(3, {message: 'Imię musi zawierać conajmniej 3 znaki!'})
        name: string;

        @IsEmail({allow_display_name: true}, {message: 'Niepoprawny adres email!'})
        email: string;

        @Matches(/[0-9]/, {message: 'Hasło musi zawierać conajmniej 1 cyfrę!'})
        @Matches(/[a-z]/, {message: 'Hasło musi zawierać conajmniej 1 małą literę!'})
        @Matches(/[A-Z]/, {message: 'Hasło musi zawierać conajmniej 1 wielką literę!'})
        @MinLength(6, {message: 'Hasło musi zawierać conajmniej 6 znaków!'})
        password: string;

        @IsOptional()
        password2: string;
    }
