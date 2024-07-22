import { Component, inject, OnInit } from '@angular/core';
import { TrainService } from '../../service/train.service';
import { InterfaceStation } from '../../model/train';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  trainServ = inject(TrainService);
  router = inject(Router);

  stationList: InterfaceStation[]=[];

  fromStationId:number = 0;
  toStationId:number = 0;
  dateOfTravel:string = '';

  ngOnInit(): void {
    this.loadAllStations()
  }

  loadAllStations(){
    this.trainServ.getAllStation().subscribe((result:any)=>{
      this.stationList = result.data;
    })
  }

  onSearch(){
    if(this.fromStationId == 0 || this.toStationId == 0 || this.dateOfTravel == ''){
      alert("Please select from all the Input fields")
    }else{
      if(this.fromStationId == this.toStationId){
        alert("Source and Destinatin shouldn't be same");
      }else{
         this.router.navigate(['/search',this.fromStationId,this.toStationId,this.dateOfTravel])
      }
    }
  }
}
