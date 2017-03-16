import { Routes, RouterModule } from '@angular/router';

import { Quickbooks } from './quickbooks.component';
import { RichGridComponent } from './components/rich-grid/rich-grid.component';
import { Disbursments } from '../forms/components/disbursment';
// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Quickbooks,
    children: [
      {
        path: 'cashidr', component: RichGridComponent, data: {account: 'Cash (IDR)'},
      },
      {
        path: 'bcaidr', component: RichGridComponent, data: {account: 'Bca (IDR)'},
      },
      {
        path: 'panin1idr', component: RichGridComponent, data: {account: 'Panin (IDR)'},
      },
      {
        path: 'panin2idr', component: RichGridComponent, data: {account: 'Panin 2 (IDR)'},
      },
      {
        path: 'briidr', component: RichGridComponent, data: {account: 'Bri (IDR)'},
      }
      // ,{ path: 'detail/:id', component: Disbursments },
    ]
  }
];

export const routing = RouterModule.forChild(routes);
