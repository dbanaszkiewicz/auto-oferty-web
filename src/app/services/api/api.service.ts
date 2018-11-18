import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(private http: HttpClient) { }

    public userLogin(email: string, password: string) {
        return this.http.post('/api/user/login', {email: email, password: password});
    }
}
