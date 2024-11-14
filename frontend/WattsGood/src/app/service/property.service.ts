import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Property} from "../model/Property";
import {Observable} from "rxjs";
import {environment} from "../../env/env";

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  constructor(private httpClient: HttpClient) { }

  createProperty(property: Property): Observable<Property> {
    return this.httpClient.post<Property>(environment.apiHost + 'properties', property);
  }

}
