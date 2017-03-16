import {Component} from '@angular/core';

import {AccountBalanceService} from './accountBalance.service';


import 'style-loader!./accountBalance.scss';

@Component({
  selector: 'account-balance',
  templateUrl: './AccountBalance.html'
})

// TODO: move chart.js to it's own component
export class AccountBalance {

  public balance: any;

  constructor(private accountBalanceService:AccountBalanceService) {

  }

  ngOnInit(){
    this.accountBalanceService.getBalance().subscribe(bal => {this.balance = bal; console.log(bal)})
  }
}
