import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { UserDetails } from '../Model/Domain/interface/UserDetails';

@Injectable({
  providedIn: 'root',
})
export class AuthDAO {
  private apiUrl = 'http://localhost:8082/api';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/login`, { username, password });
  }

  register(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/register`, user);
  }

  getClients(headers: HttpHeaders): Observable<UserDetails[]> {
    return this.http.get<UserDetails[]>(`${this.apiUrl}/clientes/listar`, { headers });
  }

  getClientById(id: number, headers: HttpHeaders): Observable<UserDetails> {
    return this.http.get<UserDetails>(`${this.apiUrl}/clientes/ver/${id}`, { headers });
  }

  deleteClientById(id: number, headers: HttpHeaders): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/clientes/borrar/${id}`, { headers });
  }

  updateClient(id: number, user: any, headers: HttpHeaders): Observable<UserDetails> {
    return this.http.put<UserDetails>(`${this.apiUrl}/clientes/editar/${id}`, user, { headers });
  }
}
