import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {
    IsAlpha,
    IsEmail,
    IsNumberString,
    IsOptional,
    Length,
    Matches,
    MinLength,
    validate,
    ValidationError
} from 'class-validator';
import {serialize} from '../../../../tools/tools';
import {ApiService} from '../../../../services/api/api.service';
import {AlertsService} from 'angular-alert-module';
import {UserService} from '../../../../services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  pf: PasswordForm;
  pfErrors: any = [];
  df: DataForm;
  dfErrors: any = [];
  loadingDF = false;
  loadingPF = false;
  isOpenResultBox = false;
  availablePlaces = [];
  osmRequest: any;
  constructor(
      private changeDetectorRef: ChangeDetectorRef,
      private apiService: ApiService,
      private alerts: AlertsService,
      private userService: UserService
  ) {
    this.pf = new PasswordForm();
    this.df = new DataForm();
    this.setUserData();
  }

  setUserData() {
      if (this.userService.isLogged !== null) {
          this.df.email = this.userService.userData.email || '';
          this.df.firstName = this.userService.userData.name || '';
          this.df.phoneNumber = this.userService.userData.phoneNumber || '';
          this.df.address = this.userService.userData.address || '';
          this.df.latitude = this.userService.userData.latitude || '';
          this.df.longitude = this.userService.userData.longitude || '';
          this.changeDetectorRef.markForCheck();
      } else {
          setTimeout(() => { this.setUserData(); }, 100);
      }
  }

  ngOnInit() {
  }

  changePassword($event: Event) {
      this.loadingPF = true;
      $event.preventDefault();
      validate(this.pf).then((errors: Array<ValidationError>) => {
          this.pfErrors = serialize(errors);

          if (this.pf.newPassword !== this.pf.newPassword2) {
              this.pfErrors['newPassword2'] = ['Podane hasła są różne!'];
              this.changeDetectorRef.detectChanges();
          }

          if (Object.keys(this.pfErrors).length <= 0) {
              this.apiService.userChangePassword(this.pf.currentPassword, this.pf.newPassword).then(value => {
                  this.alerts.setMessage('Hasło do konta zostało pomyślnie zmienione!', 'success');
                  this.loadingPF = false;
              }, reason => {
                  this.alerts.setMessage(reason.error.error.message, 'error');
                  this.loadingPF = false;
              });
          } else {
              this.loadingPF = false;
          }
      });
  }


  changeData($event: Event) {
      this.loadingDF = true;
      $event.preventDefault();
      validate(this.df).then((errors: Array<ValidationError>) => {
          this.dfErrors = serialize(errors);

          if (Object.keys(this.dfErrors).length === 0) {
              this.apiService.userChangeData(this.df).then(value => {
                  this.alerts.setMessage('Dane zostały zmienione!', 'success');
                  this.loadingDF = false;
              }, reason => {
                  this.alerts.setMessage(reason.error.error.message, 'error');
                  this.loadingDF = false;
              });
          } else {
              this.loadingDF = false;
          }
      }).catch(reason => {
          console.error(reason);
      });
  }

  openResultBox() {
      this.isOpenResultBox = true;
  }

  closeResultBox() {
      this.isOpenResultBox = false;
  }

  findByAddress() {
      clearTimeout(this.osmRequest);
      this.osmRequest = setTimeout(async () => {
          this.availablePlaces = [];

          if (this.df.address.length > 1) {
              const json = await $.getJSON('https://nominatim.openstreetmap.org/search?format=json&country=Polska&city=' + this.df.address);

              for (const item of json) {
                  const name: string = item.display_name;
                  let displayName = name.substr(0, name.indexOf(',')) + ' (';
                  if (name.indexOf('powiat') !== -1) {
                      const powiat = name.substr(
                          name.indexOf('powiat ') + 7,
                          name.indexOf(',', name.indexOf('powiat ')) - name.indexOf('powiat ') - 7
                      );
                      displayName += powiat;
                  }
                  if (name.indexOf('województwo') !== -1) {
                      const woj = name.substr(
                          name.indexOf('województwo ') + 12,
                          name.indexOf(',', name.indexOf('województwo ')) - name.indexOf('województwo ') - 12
                      );
                      if (displayName[displayName.length - 1] === '(') {
                          displayName += woj;
                      } else {
                          displayName += ', ' + woj;
                      }
                  }

                  if (name.indexOf('gmina') !== 0 && !this.inAvailablePlaces(displayName + ')') && displayName !== '(') {
                      this.availablePlaces.push({name: displayName + ')', lon: item.lon, lat: item.lat});
                  }
              }
          }
      }, 100);
  }

  inAvailablePlaces(name) {
      for (const place of this.availablePlaces) {
          if (place.name === name) {
              return true;
          }
      }
      return false;
  }

  selectAddress(place) {
      this.df.address = place.name;
      this.df.latitude = place.lat;
      this.df.longitude = place.lon;
      this.closeResultBox();
  }
}


class PasswordForm {
    @MinLength(6, {message: 'Podaj aktualne hasło!'})
    currentPassword = '';

    @Matches(/[0-9]/, {message: 'Hasło musi zawierać conajmniej 1 cyfrę!'})
    @Matches(/[a-z]/, {message: 'Hasło musi zawierać conajmniej 1 małą literę!'})
    @Matches(/[A-Z]/, {message: 'Hasło musi zawierać conajmniej 1 wielką literę!'})
    @MinLength(6, {message: 'Hasło musi zawierać conajmniej 6 znaków!'})
    newPassword = '';

    @IsOptional()
    newPassword2 = '';
}

class DataForm {
    @IsAlpha({message: 'Podane imię jest nieprawidłowe!'})
    @MinLength(3, {message: 'Imię musi zawierać conajmniej 3 znaki!'})
    firstName: string;

    @IsEmail({allow_display_name: true}, {message: 'Niepoprawny adres email!'})
    email: string;

    @Length(9, 9, {message: 'Podany numer telefonu musi zawierać 9 cyfr!'})
    @IsNumberString({message: 'Numer telefonu musi zawierać tylko cyfry!'})
    phoneNumber: string;

    @MinLength(3, {message: 'Podany adres jest nieprawidłowy!'})
    address: string;

    @IsOptional()
    longitude: string;

    @IsOptional()
    latitude: string;
}
