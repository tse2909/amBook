import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
@Injectable()
export class TransactionService {

    constructor(private http: Http) { }

    getNames(){
        return this.http.get('http://localhost:3000/names').map(k=> k.json())
    }

    getTransaction(option){
         let headers = new Headers();
      headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/getTransaction', JSON.stringify(option), {headers: headers}).map(k => k.json())
    }

    getAllTransaction(){
         return this.http.get('http://localhost:3000/transaction').map(k => k.json())
    }

    getTransactionbyOption(option){
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/transactionbyOption', JSON.stringify(option), {headers: headers}).map(k => k.json())
    }

}