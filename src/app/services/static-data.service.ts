import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StaticDataService {

  public static fuelTypes = ['Benzyna', 'Benzyna+LPG', 'Diesel', 'Hybryda', 'Elektryczny'];
  public static gearboxTypes = ['Automatyczna', 'Manualna'];
  public static bodyColors = ['Czerwony', 'Zielony', 'Biały', 'Czarny', 'Niebieski', 'Srebrny', 'Złoty', 'Szary'];
  public static bodyTypes = ['SUV', 'Coupé', 'Hatchback', 'Kabriolet', 'Kombi', 'Sedan'];

  constructor() { }
}
