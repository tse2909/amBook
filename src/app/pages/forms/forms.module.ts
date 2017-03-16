import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule as AngularFormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { AgGridModule } from 'ag-grid-ng2';
import { routing } from './forms.routing';
import { SelectModule } from 'angular2-select';
import { RatingModule } from 'ng2-bootstrap';
import { Forms } from './forms.component';
import { Disbursments } from './components/disbursment';
import { Receipt } from './components/receipt';
import { NKDatetimeModule } from 'ng2-datetime/ng2-datetime';

import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';

// import { SelectInputs } from './components/disbursment/components/selectInputs';
import { RichGridComponent } from './components/disbursment/components/gridTable';
import { RichGridChequeComponent } from './components/disbursment/components/gridTableCheque';



import { TransactionService } from './components/disbursment/transaction.service';

@NgModule({
  imports: [
    CommonModule,
    AngularFormsModule, ReactiveFormsModule,
    NgaModule,
    SelectModule,
    RatingModule.forRoot(),
    routing,
    AgGridModule.withComponents([]),
    NKDatetimeModule,
    Ng2Bs3ModalModule
  ],
  declarations: [
    Receipt,
    Disbursments,
    Forms,
    // SelectInputs,
    RichGridComponent,
    RichGridChequeComponent
  ],
  providers: [TransactionService]
})
export class FormsModule {
}
