import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import {environment} from "../../env/env";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) {}

  register(user: any): Observable<any> {
    return this.httpClient.post(`${environment.apiHost}auth/register`, user, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  login(credentials: any): Observable<any> {
    return this.httpClient.post(`${environment.apiHost}auth/login`, credentials, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }).pipe(
      tap((response: any) => {
        if (response && response.jwtToken) {
          this.storeToken(response.jwtToken);
        }
      })
    );
  }

  private storeToken(token: string) {
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
