import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListRoutingModule } from './list-routing.module';
import { ListComponent } from './list/list.component';
import {ComponentsModule} from '../../components/components.module';
import {FormModule} from '../form/form.module';
import {FormsModule} from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';
import {AccordionModule, EditorModule} from 'primeng/primeng';
import {DataTableModule} from 'angular-6-datatable';

@NgModule({
  imports: [
    CommonModule,
    ListRoutingModule,
    ComponentsModule,
    FormModule,
    FormsModule,
    NgSelectModule,
    AccordionModule,
    EditorModule,
    DataTableModule,
  ],
  declarations: [ListComponent]
})
export class ListModule { }
