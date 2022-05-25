import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Baby } from './baby';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  readonly API_URL = "http://127.0.0.1:8000";

  constructor(private http:HttpClient) { }

  AddData(isPipi: any, isCaca: any, isMilk: any, milkVal: any){
    var data = new Baby();
    data.Pipi= isPipi;
    data.Caca= isCaca;
    data.Milk= isMilk;
    data.MilkQuantity = milkVal;
    console.log(data)
    return this.http.post(this.API_URL + "/baby/", data);
  }
}