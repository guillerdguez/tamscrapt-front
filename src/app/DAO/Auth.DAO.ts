import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDetails } from '../Model/Domain/interface/UserDetails';

@Injectable({
  providedIn: 'root',
})
export class AuthDAO {
  // private apiUrl = 'http://localhost:8082/api';

  private apiUrl = 'https://tamscrap-back-production.up.railway.app/api';
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/login`, {
      username,
      password,
    });
  }

  register(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/register`, user);
  }
}
