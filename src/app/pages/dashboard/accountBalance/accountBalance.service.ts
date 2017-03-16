import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class AccountBalanceService {
  private url = 'http://localhost:3000/getBalance';
  constructor(private http:Http) {
  }

  getBalance(){
    return this.http.get(this.url).map(balance => balance.json());
  }
  
}
