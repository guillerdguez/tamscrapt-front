import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../Model/Domain/User/User.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthDAO {
  private apiUrl = 'http://localhost:8082/api';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  // LOGIN
  login(username: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/auth/login`;
    return this.http.post<any>(url, { username, password }, this.httpOptions);
  }

  // REGISTER
  register(user: any): Observable<any> {
    const url = `${this.apiUrl}/auth/register`;
    return this.http.post<any>(url, user, this.httpOptions);
  }

  // GET CLIENTS
  getClients(): Observable<User[]> {
    const url = `${this.apiUrl}/clientes/listar`;
    return this.http.get<User[]>(url, this.getAuthOptions());
  }

  // GET CLIENT BY ID
  getClientById(id: number): Observable<User> {
    const url = `${this.apiUrl}/clientes/ver/${id}`;
    return this.http.get<User>(url, this.getAuthOptions());
  }

  // UPDATE CLIENT
  updateClient(id: number, user: any): Observable<User> {
    const url = `${this.apiUrl}/clientes/editar/${id}`;
    return this.http.put<User>(url, user, this.getAuthOptions());
  }

  // DELETE CLIENT
  deleteClientById(id: number): Observable<void> {
    const url = `${this.apiUrl}/clientes/borrar/${id}`;
    return this.http.delete<void>(url, this.getAuthOptions());
  }

  // OBTENER TOKEN
  private getToken(): string | null {
    return localStorage.getItem('token');
  }

  // CONFIGURAR OPCIONES DE AUTENTICACIÓN
  private getAuthOptions(): { headers: HttpHeaders } {
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return { headers };
  }
}
