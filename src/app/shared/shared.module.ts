import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule as AngularFormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-ng2';
import { SelectModule } from 'angular2-select';


import { NKDatetimeModule } from 'ng2-datetime/ng2-datetime';

import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';

// import { SelectInputs } from './components/disbursment/components/selectInputs';
import { RichGridComponent } from '../pages/forms/components/disbursment/components/gridTable';
import { RichGridChequeComponent } from '../pages/forms/components/disbursment/components/gridTableCheque';

import { Disbursments } from '../pages/forms/components/disbursment';
import { Receipt } from '../pages/forms/components/receipt';
@NgModule({
  imports:      [ CommonModule,AgGridModule.withComponents([]),SelectModule,NKDatetimeModule,Ng2Bs3ModalModule,AngularFormsModule ],
  declarations: [ Disbursments, Receipt,RichGridComponent, RichGridChequeComponent],
  exports:      [ Disbursments, Receipt,RichGridComponent, RichGridChequeComponent,
                  CommonModule, AngularFormsModule,AgGridModule,SelectModule,NKDatetimeModule,Ng2Bs3ModalModule ]
})
export class SharedModule { }