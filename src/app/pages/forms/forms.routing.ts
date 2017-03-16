import { Routes, RouterModule }  from '@angular/router';

import { Forms } from './forms.component';
import { Disbursments } from './components/disbursment/disbursment.component';
import { Receipt } from './components/receipt/receipt.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Forms,
    children: [
      { path: 'disbursment', component: Disbursments },
      { path: 'receipt', component: Receipt }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
