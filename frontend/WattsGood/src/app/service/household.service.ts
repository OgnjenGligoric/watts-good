import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import { environment } from '../../env/env';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HouseholdService {

  constructor(private httpClient: HttpClient) { }

  getAllHouseholds(): Observable<any> {
    return this.httpClient.get<any>(environment.apiHost + 'households');
  }

  searchHouseholdsBy(city?: string, squareMeters?: number, floorNumber?: number): Observable<any> {
    let params = new HttpParams();

    if (city) {
      params = params.set('city', city);
    }
    if (squareMeters) {
      params = params.set('squareMeters', squareMeters.toString());
    }
    if (floorNumber) {
      params = params.set('floorNumber', floorNumber.toString());
    }

    return this.httpClient.get<any>(environment.apiHost + 'households/search', { params });
  }

  getActivityHistory(householdId: string, startTime: number, endTime: number): Observable<any> {
    const params = new HttpParams()
      .set('householdId', householdId)
      .set('startTime', startTime.toString())  // Ensure the timestamps are in milliseconds or seconds as required
      .set('endTime', endTime.toString());

    return this.httpClient.get<any>(environment.apiHost + 'households/activity/history', { params });
  }
}
