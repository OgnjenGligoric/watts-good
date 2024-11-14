import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import {environment} from "../../env/env";
import {User} from "../model/User";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = `${environment.apiHost}users`;

  constructor(private httpClient: HttpClient) {}

  activateSuperAdmin(password:string): Observable<User> {
    return this.httpClient.post<User>(`${this.apiUrl}/activate/superAdmin/${password}`, {}, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  activateUser(email:string ,password:string): Observable<User> {
    return this.httpClient.post<User>(`${this.apiUrl}/activate/${email}/${password}`, {}, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  getAuthenticatedUser(): Observable<User> {
    return this.httpClient.get<User>(`${this.apiUrl}/me`, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.apiUrl}/all`, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }
}
