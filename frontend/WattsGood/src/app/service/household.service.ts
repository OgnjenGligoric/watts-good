import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
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
}
