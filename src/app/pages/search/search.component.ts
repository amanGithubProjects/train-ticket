import { Component, inject, Pipe } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {  InterfTrain, Search } from '../../model/train';
import { TrainService } from '../../service/train.service';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [DatePipe,CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

  activatedRoute = inject(ActivatedRoute);
  trainServ  = inject(TrainService);
  searchData:Search = new Search();
  trainList : InterfTrain[] = [];
  testObj : any []= [];

  constructor(){
    this.activatedRoute.params.subscribe((res:any)=>{
      // debugger
     this.searchData = res;
     this.getSearchTrains();
    })
  }

  getSearchTrains(){
    this.trainServ.getTrainSearch(this.searchData.fromStationId, this.searchData.toStationId, this.searchData.dateOfTravel)
    .subscribe((res:any)=>{
      console.log(this.trainList);
      console.log(this.searchData.fromStationId);
      console.log(this.searchData.toStationId);
      console.log(this.searchData.dateOfTravel);
      console.log(res.data);
    this.trainList = res.data;
    console.log(this.trainList.values);
    
    
    })
  }
} 
