import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { InterfTrain } from '../model/train';
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
    return this.http.get(`https://freeapi.miniprojectideas.com/api/TrainApp/GetTrainsBetweenStations?departureStationId=${from}&arrivalStationId=${to}&departureDate=${date}`);
  }
}
// https://freeapi.miniprojectideas.com/api/TrainApp/GetTrainsBetweenStations?departureStationId=129&arrivalStationId=2&departureDate=2024-07-13