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

  createProperty(property: Property, images: File[], pdfs: File[]): Observable<Property> {
    const formData = new FormData();

    formData.append('property', new Blob([JSON.stringify(property)], { type: 'application/json' }));

    images.forEach((image: File) => {
      formData.append('images', image);
    });

    pdfs.forEach((pdf: File) => {
      formData.append('pdfs', pdf);
    });

    return this.httpClient.post<Property>(environment.apiHost + 'properties', formData);
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
