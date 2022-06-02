import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Baby } from './baby';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  //readonly API_URL = "http://192.168.0.100:8000";

  constructor(private http:HttpClient) { }

  AddData(isPipi: any, isCaca: any, isMilk: any, milkVal: any){
    var data = new Baby();

    data.Pipi= isPipi;
    data.Caca= isCaca;
    data.Milk= isMilk;
    data.MilkQuantity = milkVal;
    console.log(data)

    return this.http.post(location.origin + ":8000/baby/", data);
    //return this.http.post(this.API_URL + "/baby/", data);
  }

  GetInformations(){
    console.log("test test")
    console.log(location.origin);
    console.log(location.href);

    return this.http.get(location.origin + ":8000/baby/");
  }
}
