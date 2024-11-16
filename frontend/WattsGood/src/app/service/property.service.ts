import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Property} from "../model/Property";
import {Observable} from "rxjs";
import {environment} from "../../env/env";
import {City} from "../model/City";

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  constructor(private httpClient: HttpClient) { }

  createProperty(property: Property): Observable<Property> {
    return this.httpClient.post<Property>(environment.apiHost + 'properties', property);
  }
  getAllPropertyRequests(): Observable<Property[]> {
    return this.httpClient.get<Property[]>(environment.apiHost + 'properties');
  }
  getAllPropertyRequestsByOwner(id:number): Observable<Property[]> {
    return this.httpClient.get<Property[]>(environment.apiHost + `properties/owner/${id}`);
  }

  getPendingPropertyRequests(): Observable<Property[]> {
    return this.httpClient.get<Property[]>(environment.apiHost + 'properties/pending');
  }

  acceptPropertyRequest(id: number): Observable<Property> {
    return this.httpClient.put<Property>(environment.apiHost + `properties/${id}/accept`, {});
  }

  declinePropertyRequest(id: number,reason: string): Observable<Property> {
    return this.httpClient.put<Property>(environment.apiHost + `properties/${id}/decline`, reason);
  }

}
