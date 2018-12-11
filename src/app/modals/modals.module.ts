import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {FormModule} from '../modules/form/form.module';
import {FormsModule} from '@angular/forms';
import {ComponentsModule} from '../components/components.module';

@NgModule({
  declarations: [
      LoginComponent,
      RegisterComponent
  ],
  imports: [
    CommonModule,
      FormModule,
      FormsModule,
      ComponentsModule
  ],
  exports: [
      LoginComponent,
      RegisterComponent
  ]
})
export class ModalsModule { }
