import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ShortOfferInfo} from '../../components/main-page/main-page.component';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(private http: HttpClient) { }

    public userLogin(email: string, password: string): Promise<object> {
        return this.http.post('/api/user/login', {email: email, password: password}).toPromise();
    }

    public userGetData(): Promise<object> {
        return this.http.get('/api/user/get-my-data').toPromise();
    }

    public userLogout(): Promise<object> {
        return this.http.get('/api/user/logout').toPromise();
    }

    public register(email: string, name: string, password: string): Promise<object> {
        return this.http.post('/api/user/register', {email: email, password: password, firstName: name}).toPromise();
    }

    public userChangePassword(oldPassword: string, newPassword: string): Promise<object> {
        return this.http.post('/api/user/change-password', {newpass: newPassword, oldpass: oldPassword}).toPromise();
    }

    public userChangeData(data: object): Promise<object> {
        return this.http.post('/api/user/change-data', data).toPromise();
    }

    public addOffer(data: object): Promise<object> {
        return this.http.post('/api/offer/add', data).toPromise();
    }

    public renewOffer(id: number): Promise<object> {
        return this.http.post('/api/offer/renew/' + id, null).toPromise();
    }

    public removeOffer(id: number): Promise<object> {
        return this.http.delete('/api/offer/remove/' + id).toPromise();
    }

    public mostPopular(): Promise<object> {
        return this.http.get('/api/offer/popular').toPromise();
    }

    public getOffer(id: number): Promise<OfferModel> {
        return this.http.get('/api/offer/get-offer/' + id).toPromise() as Promise<OfferModel>;
    }

    public findOffers(data: any): Promise<ShortOfferInfo[]> {
        return this.http.post('/api/offer/find', data).toPromise() as Promise<ShortOfferInfo[]>;
    }

    public getEditOfferData(id: number): Promise<object> {
        return this.http.get('/api/offer/get-edit-data/' + id).toPromise();
    }

    public getUserOfferList(): Promise<object> {
        return this.http.get('/api/user/get-offer-list').toPromise();
    }

    public removePhoto(id: number): Promise<object> {
        return this.http.get('/api/offer/remove-photo/' + id.toString()).toPromise();
    }

    getEquipments(): Promise<object> {
        return this.http.get('/api/equipment/get').toPromise();
    }

    getBMVData(): Promise<object> {
        return this.http.get('/api/brand-model-version').toPromise();
    }
}

export class SimpleUserModel {
    id: string;
    name: string;
    phone: string;
    longitude: number;
    latitude: number;
    address: string;
}

export class OfferModel {

    name: string;
    brand: string;
    model: string;
    version: string;
    price: number;
    afterAccident: boolean;
    used: boolean;
    doors: string;
    fuelType: string;
    meterStatus: number;
    enginePower: number;
    engineCapacity: number;
    gearbox: string;
    productionYear: number;
    bodyColor: string;
    bodyType: string;
    description: string;
    createData: string;
    expireData: string;
    visitCounter: number;
    equipments: string[];
    photos: string[];
    user: SimpleUserModel;
}
