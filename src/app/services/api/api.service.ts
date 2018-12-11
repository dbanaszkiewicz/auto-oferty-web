import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

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

    getEquipments(): Promise<object> {
        return Promise.resolve([
            {
                'id': 1,
                'value': 'Alarm'
            },
            {
                'id': 2,
                'value': 'Alufelgi'
            },
            {
                'id': 3,
                'value': 'ASR (kontrola trakcji)'
            },
            {
                'id': 4,
                'value': 'Asystent Parkowania'
            },
            {
                'id': 5,
                'value': 'Asystent pasa ruchu'
            },
            {
                'id': 6,
                'value': 'Bluetooth'
            },
            {
                'id': 7,
                'value': 'Czujnik deszczu'
            },
            {
                'id': 8,
                'value': 'Czujnik martwego pola'
            },
            {
                'id': 9,
                'value': 'Czujnik zmierzchu'
            },
            {
                'id': 10,
                'value': 'Czujniki parkowania przednie'
            },
            {
                'id': 11,
                'value': 'Czujniki parkowania tylne'
            },
            {
                'id': 12,
                'value': 'Dach panoramiczny'
            },
            {
                'id': 13,
                'value': 'Elektrochromatyczne lusterka boczne'
            },
            {
                'id': 14,
                'value': 'Elektrochromatyczne lusterko wsteczne'
            },
            {
                'id': 15,
                'value': 'Elektryczne szyby tylne'
            },
            {
                'id': 16,
                'value': 'Elektryczne szyby przednie'
            },
            {
                'id': 17,
                'value': 'Elektrycznie ustawiane fotele'
            },
            {
                'id': 18,
                'value': 'Elektrycznie ustawiane lusterka'
            },
            {
                'id': 19,
                'value': 'Gniazdo AUX'
            },
            {
                'id': 20,
                'value': 'Gniazdo SD'
            },
            {
                'id': 21,
                'value': 'Gniazdo USB'
            },
            {
                'id': 22,
                'value': 'Immobilizer'
            },
            {
                'id': 23,
                'value': 'Kamera cofania'
            },
            {
                'id': 24,
                'value': 'Klimatyzacja automatyczna'
            },
            {
                'id': 25,
                'value': 'Klimatyzacja manualna'
            },
            {
                'id': 26,
                'value': 'Kurtyny powietrzne'
            },
            {
                'id': 27,
                'value': 'Nawigacja GPS'
            },
            {
                'id': 28,
                'value': 'Odtwarzacz DVD'
            },
            {
                'id': 29,
                'value': 'Ogranicznik prędkości'
            },
            {
                'id': 30,
                'value': 'Ogrzewanie postojowe'
            },
            {
                'id': 31,
                'value': 'Podgrzewana przednia szyba'
            },
            {
                'id': 32,
                'value': 'Podgrzewane lusterka boczne'
            },
            {
                'id': 33,
                'value': 'Podgrzewane fotele'
            },
            {
                'id': 34,
                'value': 'Poduszka powietrzna chroniąca kolana'
            },
            {
                'id': 35,
                'value': 'Poduszki boczne przednie'
            },
            {
                'id': 36,
                'value': 'Poduszki boczne tylne'
            },
            {
                'id': 37,
                'value': 'Przyciemniane szyby'
            },
            {
                'id': 38,
                'value': 'Radio fabryczne'
            },
            {
                'id': 39,
                'value': 'Relingi dachowe'
            },
            {
                'id': 40,
                'value': 'System multimedialny'
            },
            {
                'id': 41,
                'value': 'System Start-Stop'
            },
            {
                'id': 42,
                'value': 'Szyberdach'
            },
            {
                'id': 43,
                'value': 'Światła do jazdy dziennej'
            },
            {
                'id': 44,
                'value': 'Światła LED'
            },
            {
                'id': 45,
                'value': 'Światła przeciwmgielne'
            },
            {
                'id': 46,
                'value': 'Światła Xenonowe'
            },
            {
                'id': 47,
                'value': 'Tempomat'
            },
            {
                'id': 48,
                'value': 'Tempomat aktywny'
            },
            {
                'id': 49,
                'value': 'Wielofunkcyjna kierownica'
            }
        ]);
    }
    
    getBrands(): Promise<object> {
        return Promise.resolve([
            {
                'id': 1,
                'value': 'Fiat'
            },
            {
                'id': 2,
                'value': 'Volkswagen'
            },
            {
                'id': 3,
                'value': 'Kia'
            },
        ]);
    }
    
    getModelsByBrand(brand: string): Promise<object> {
        return Promise.resolve([
            {
                'id': 1,
                'value': 'Model 1'
            },
            {
                'id': 2,
                'value': 'Model 2'
            },
            {
                'id': 3,
                'value': 'Model 3'
            },
            {
                'id': 4,
                'value': 'Model 4'
            }
        ]);
    }
    
    getVersionsByBrandAndModel(brand: string, model: string) {
        return Promise.resolve([
            {
                'id': 1,
                'value': 'Wersja 1'
            },
            {
                'id': 2,
                'value': 'Wersja 2'
            },
            {
                'id': 3,
                'value': 'Wersja 3'
            },
            {
                'id': 4,
                'value': 'Wersja 4'
            }
        ]);
    }
}
