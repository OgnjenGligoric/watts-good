import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import {environment} from "../../env/env";
import {User} from "../model/User";
import {LoginInfo} from "../model/LoginInfo";
import {LoginResponse} from "../model/LoginResponse";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.apiHost}auth`;

  constructor(private httpClient: HttpClient) {}

  register(user: User, file: File): Observable<User> {
    const formData: FormData = new FormData();
    formData.append('userDTO', new Blob([JSON.stringify(user)], { type: 'application/json' }));
    formData.append('image', file, file.name);
    return this.httpClient.post<User>(`${this.apiUrl}/register`, formData, {
      headers: new HttpHeaders({ 'Accept': 'application/json' })
    });
  }

  login(credentials: LoginInfo): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(`${this.apiUrl}/login`, credentials, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  storeToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
