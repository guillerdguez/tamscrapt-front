import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserDetails } from '../../Model/Domain/interface/UserDetails';
import { UserAuthority } from '../../Model/Domain/User/UserAuthority.enum';

@Injectable({
  providedIn: 'root',
})
//separar DAO y service
export class AuthService {
  private apiUrl = 'http://localhost:8082/api';
  private currentUserSubject: BehaviorSubject<UserDetails | null>;
  public currentUser$: Observable<UserDetails | null>;

  constructor(private http: HttpClient, private router: Router) {
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<UserDetails | null>(
      storedUser ? JSON.parse(storedUser) : null
    );
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): UserDetails | null {
    return this.currentUserSubject.value;
  }
  login(username: string, password: string): Observable<UserDetails> {
    return this.http
      .post<any>(`${this.apiUrl}/auth/login`, { username, password })
      .pipe(
        map((response) => {
          if (response && response.token) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('currentUser', JSON.stringify(response.user));
            this.currentUserSubject.next(response.user);
          }
          return response.user;
        })
      );
  }

  register(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/register`, user);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  hasAuthority(authority: UserAuthority): boolean {
    const user = this.currentUserValue;
    return user ? user.authorities.includes(authority) : false;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getClients(): Observable<UserDetails[]> {
    return this.http.get<UserDetails[]>(`${this.apiUrl}/clientes/listar`, {
      headers: this.getAuthHeaders(),
    });
  }

  getClientById(id: number): Observable<UserDetails> {
    return this.http.get<UserDetails>(`${this.apiUrl}/clientes/ver/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }

  deleteClientById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/clientes/borrar/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }
  getCurrentUserId(): number | undefined {
    const currentUser = this.currentUserValue;
    return currentUser ? currentUser.id : undefined;
  }

  updateClient(id: number, user: any): Observable<UserDetails> {
    return this.http.put<UserDetails>(
      `${this.apiUrl}/clientes/editar/${id}`,
      user,
      {
        headers: this.getAuthHeaders(),
      }
    );
  }

  private getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }
}
