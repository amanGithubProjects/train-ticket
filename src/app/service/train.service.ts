import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { APIresponse, Customer, InterfTrain, Login } from '../model/train';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrainService {

  http = inject(HttpClient);

  apiURL:string = 'https://freeapi.miniprojectideas.com/api/TrainApp/';
  constructor() { }

  getAllStation(){
    return this.http.get(`${this.apiURL}GetAllStations`);
  }

  getTrainSearch(from: number, to:number, date:string){
    return this.http.get(`${this.apiURL}GetTrainsBetweenStations?departureStationId=${from}&arrivalStationId=${to}&departureDate=${date}`);
  }

  createNewCustomer(obj:Customer){
    return this.http.post<APIresponse>(`${this.apiURL}AddUpdatePassengers`,obj)
  }

  loginCustomer(obj:Login){
    return this.http.post<APIresponse>(`${this.apiURL}login`,obj)
  }

  bookTrain(obj:any){
    return this.http.post<APIresponse>(`${this.apiURL}bookTrain`,obj)
  }
}
// https://freeapi.miniprojectideas.com/api/TrainApp/GetTrainsBetweenStations?departureStationId=129&arrivalStationId=2&departureDate=2024-07-13