import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../env/env";
import {City} from "../model/City";

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<City[]>{
    return this.httpClient.get<City[]>(environment.apiHost + 'cities')
  }

}
