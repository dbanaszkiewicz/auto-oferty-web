import {Component, OnInit, Input, Output, OnChanges, EventEmitter, HostListener} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import * as $ from 'jquery';

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

    loading = false;

    constructor() { }

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
}
