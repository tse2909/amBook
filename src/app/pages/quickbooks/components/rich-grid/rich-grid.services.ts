import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
@Injectable()
export class DataService {
    private url = 'http://localhost:3000/transaction';
    constructor(private http:Http) { }

    public getData(){
        return this.http.get(this.url).map(p => p.json());
    }
}