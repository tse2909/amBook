import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { SelectModule } from 'angular2-select';

import { routing }       from './quickbooks.routing';
import { Quickbooks } from './quickbooks.component';
import { RichGridComponent } from './components/rich-grid/rich-grid.component';

import { NKDatetimeModule } from 'ng2-datetime/ng2-datetime';
import {AgGridModule} from "ag-grid-ng2/main";
import { TransactionService } from './components/rich-grid/transaction.service';
import { Disbursments } from '../forms/components/disbursment';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgaModule,
    AgGridModule.withComponents([]),
    routing,
    NKDatetimeModule,
    SelectModule,
    Ng2Bs3ModalModule
  ],
  declarations: [
    Quickbooks,
    RichGridComponent,
    // Disbursments
  ],
  providers: [
    TransactionService
  ]
})
export class QuickbooksModule {
}
