import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {MainPageComponent} from './components/main-page/main-page.component';
import {CommonModule} from '@angular/common';
import {NgSelectModule} from '@ng-select/ng-select';
import {NgxSelectModule} from 'ngx-select-ex';
import { LoginComponent } from './modals/login/login.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RegisterComponent} from './modals/register/register.component';
import { LoaderComponent } from './components/loader/loader.component';
import {ApiService} from './services/api/api.service';
import {HttpClientModule} from '@angular/common/http';
import {AlertsModule} from 'angular-alert-module';

@NgModule({
    declarations: [
        AppComponent,
        MainPageComponent,
        LoginComponent,
        RegisterComponent,
        LoaderComponent
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
        AlertsModule.forRoot()
    ],
    providers: [
        ApiService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
