import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { environment } from '../../env/env';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  url: string = environment.apiHost + "api/socket";
  restUrl:string = environment.apiHost + "/sendMessageRest";

  constructor(private http: HttpClient) { }

  post(data: Consumption) {
    return this.http.post<Consumption>(this.url, data)
      .pipe(map((data: Consumption) => { return data; }));
  }

  postRest(data: Consumption) {
    return this.http.post<Consumption>(this.restUrl, data)
      .pipe(map((data: Consumption) => { return data; }));
  }
}
export interface Consumption {
  message: string,
  fromId: string,
  toId: string,
}
