import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {MainPageComponent} from './components/main-page/main-page.component';
import {CommonModule} from '@angular/common';
import {NgSelectModule} from '@ng-select/ng-select';
import {NgxSelectModule} from 'ngx-select-ex';

@NgModule({
    declarations: [
        AppComponent,
        MainPageComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        CommonModule,
        NgSelectModule,
        FormsModule,
        NgxSelectModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
