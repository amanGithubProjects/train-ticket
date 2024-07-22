export interface InterfaceStation{
    stationID:number;
    stationName:string;
    stationCode:string;
}

export class Search{
    fromStationId:number;
    toStationId:number;
    dateOfTravel:string;
    fromStationName?: string; 
    toStationName?: string;

    constructor(){
        this.fromStationId = 0;
        this.toStationId = 0;
        this.dateOfTravel = '';
    }
}


export interface InterfTrain{
  trainId: number;
  trainNo: number;
  trainName: string;
  departureStationName: string;
  arrivalStationName: string;
  arrivalTime: string;
  departureTime: string;
  totalSeats: number;
  departureDate: string;
  bookedSeats: number;
}