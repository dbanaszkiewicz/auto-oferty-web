import { Injectable } from '@angular/core';
import {ApiService} from './api/api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

    isLogged = false;
    userData: UserData = new UserData();

  constructor(private apiService: ApiService) {
      this.fetchUserData();
  }

  public async fetchUserData() {
      const res: any = await this.apiService.userGetData();
      if (res.UserInfoResult.isLogged) {
          this.isLogged = true;
          this.userData = {
              id: res.UserInfoResult.id,
              name: res.UserInfoResult.name,
              address: res.UserInfoResult.address,
              phoneNumber: res.UserInfoResult.phoneNumber,
              email: res.UserInfoResult.email,
          };
      } else {
          this.isLogged = false;
          this.userData = new UserData();
      }
  }

  public async logout() {
      await this.apiService.userLogout();
      this.isLogged = false;
      this.userData = new UserData();
  }
}

export class UserData {
    id: number;
    name: string;
    address: string;
    phoneNumber: string;
    email: string;
}
