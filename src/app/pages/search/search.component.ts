import { Component, inject, OnInit, Pipe } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  APIresponse,
  Customer,
  InterfaceStation,
  InterfTrain,
  Search,
} from '../../model/train';
import { TrainService } from '../../service/train.service';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [DatePipe, CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent implements OnInit {
  activatedRoute = inject(ActivatedRoute);
  trainServ = inject(TrainService);
  searchData: Search = new Search();
  trainList: InterfTrain[] = [];
  testObj: any[] = [];
  stationList: InterfaceStation[] = [];
  selectedTrain?: InterfTrain;

  passenger: any = {
    passengerName: '',
    age: '',
  };
  passengerList: any[] = [];

  loggedUserData: Customer = new Customer();

  constructor() {
    const localData = localStorage.getItem('irctcApp');
    if (localData != null) {
      this.loggedUserData = JSON.parse(localData);
    }
    this.activatedRoute.params.subscribe((res: any) => {
      // debugger
      this.searchData.fromStationId = res.fromStationId;
      this.searchData.toStationId = res.toStationId;
      this.searchData.dateOfTravel = res.dateOfTravel;
      this.getSearchTrains();
    });
  }

  ngOnInit(): void {
    this.loadAllStations();
  }

  getSearchTrains() {
    this.trainServ
      .getTrainSearch(
        this.searchData.fromStationId,
        this.searchData.toStationId,
        this.searchData.dateOfTravel
      )
      .subscribe((res: any) => {
        console.log(this.trainList);
        console.log(this.searchData.fromStationId);
        console.log(this.searchData.toStationId);
        console.log(this.searchData.dateOfTravel);
        console.log(res.data);
        this.trainList = res.data;
        console.log(this.trainList.values);
      });
  }

  loadAllStations() {
    this.trainServ.getAllStation().subscribe((result: any) => {
      this.stationList = result.data;
    });
  }

  open(train: InterfTrain) {
    this.selectedTrain = train;
    const Regmodel = document.getElementById('myBookingModal');
    if (Regmodel != null) {
      Regmodel.style.display = 'block';
    }
  }
  close() {
    const Regmodel = document.getElementById('myBookingModal');
    if (Regmodel != null) {
      Regmodel.style.display = 'none';
    }
  }

  addPassenger() {
    const strObj = JSON.stringify(this.passenger);
    const parsObj = JSON.parse(strObj);
    this.passengerList.push(parsObj);
  }

  bookTicket() {
    const bookingObj = {
      bookingId: 0,
      trainId: this.selectedTrain?.trainId,
      passengerId: this.loggedUserData.passengerID,
      travelDate: this.searchData.dateOfTravel,
      bookingDate: new Date(),
      totalSeats: 0,
      TrainAppBookingPassengers: [] as any,
    };
    bookingObj.TrainAppBookingPassengers = this.passengerList;
    bookingObj.totalSeats = this.passengerList.length;
    this.trainServ.bookTrain(bookingObj).subscribe((res:APIresponse)=>{
      if(res.result){
        alert("Ticket Booking success...");
      }else{
        alert(res.message);
      }
    })
  }
}
