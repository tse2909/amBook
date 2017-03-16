import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

export const contentHeaders = new Headers();
contentHeaders.append('Accept', 'application/json');
contentHeaders.append('Content-Type', 'application/json');
contentHeaders.append('X-Requested-With', 'XMLHttpRequest');

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

    postTransactions(option){
        console.log(option);
         let headers = new Headers();
      headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/postTransaction', JSON.stringify(option), {headers: contentHeaders})
    .map(res => res.json()).subscribe();
    }
    
    getAllTransaction(){
         return this.http.get('http://localhost:3000/transaction').map(k => k.json())
    }
}