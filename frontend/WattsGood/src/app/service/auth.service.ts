import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import {environment} from "../../env/env";
import {Role, User} from "../model/User";
import {LoginInfo} from "../model/LoginInfo";
import {LoginResponse} from "../model/LoginResponse";
import {jwtDecode} from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.apiHost}auth`;

  constructor(private httpClient: HttpClient) {}

  register(user: User): Observable<User> {
    return this.httpClient.post<User>(`${this.apiUrl}/register`, user, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  login(credentials: LoginInfo): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(`${this.apiUrl}/login`, credentials, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  uploadFile(formData: FormData, email:string): Observable<any>{
    return this.httpClient.post<any>(`${environment.apiHost}images/upload/${email}`, formData);
  }

  storeToken(token: string) {
    localStorage.setItem('token', token);
    if (token) {
      const decoded: any = jwtDecode(token);
      localStorage.setItem('email', decoded.sub);
      localStorage.setItem('role', decoded.role);
    }
  }

  storeActive(isActive : boolean) {
    if (isActive) {
      localStorage.setItem('isActive', '1');
    }else{
      localStorage.setItem('isActive', '0');
    }
  }

  isActive():boolean | null{
    return localStorage.getItem('isActive') === '1';
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getEmail(): string | null{
    return localStorage.getItem('email');
  }

  getRole(): Role | null{
    const role = localStorage.getItem('role');
    if (role && Object.values(Role).includes(role as Role)) {
      return role as Role;
    }
    return null;
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('role');
    localStorage.removeItem('isActive');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
