import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(private http: HttpClient) { }

    public userLogin(email: string, password: string): Promise<object>{
        return this.http.post('/api/user/login', {email: email, password: password}).toPromise();
    }

    public userGetData(): Promise<object> {
        return this.http.get('/api/user/get-my-data').toPromise();
    }

    public userLogout(): Promise<object> {
        return this.http.get('/api/user/logout').toPromise();
    }

}
