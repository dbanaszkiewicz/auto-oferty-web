import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {MainPageComponent} from './components/main-page/main-page.component';
import {CommonModule} from '@angular/common';
import {NgSelectModule} from '@ng-select/ng-select';
import {NgxSelectModule} from 'ngx-select-ex';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ApiService} from './services/api/api.service';
import {HttpClientModule} from '@angular/common/http';
import {AlertsModule} from 'angular-alert-module';
import {UserService} from './services/user.service';
import {FormModule} from './modules/form/form.module';
import {ModalsModule} from './modals/modals.module';

@NgModule({
    declarations: [
        AppComponent,
        MainPageComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        CommonModule,
        NgSelectModule,
        FormsModule,
        NgxSelectModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FormModule,
        AlertsModule.forRoot(),
        ModalsModule
    ],
    providers: [
        ApiService,
        UserService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
