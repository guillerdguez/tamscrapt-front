import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserDetails } from '../../Model/Domain/interface/UserDetails';
import { UserAuthority } from '../../Model/Domain/User/UserAuthority.enum';
import { AuthDAO } from '../../DAO/AuthDAO';
import { AlgoModel } from '../../Model/Views/Dynamic/AlgoModel';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<UserDetails | null>;
  public currentUser$: Observable<UserDetails | null>;

  constructor(
    private authDAO: AuthDAO,
    private router: Router,
    private algoModel: AlgoModel
  ) {
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
    return this.authDAO.login(username, password).pipe(
      map((response) => {
        this.algoModel.algo = [];
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('currentUser', JSON.stringify(response.user));
          this.currentUserSubject.next(response.user);
          // this.router.navigate(['/home']).then(() => {
          //   window.location.reload();
          // });
        }
        return response.user;
      })
    );
  }

  register(user: any): Observable<any> {
    return this.authDAO.register(user);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/home']);
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
    return this.authDAO.getClients(this.getAuthHeaders());
  }

  getClientById(id: number): Observable<UserDetails> {
    return this.authDAO.getClientById(id, this.getAuthHeaders());
  }

  deleteClientById(id: number): Observable<void> {
    return this.authDAO.deleteClientById(id, this.getAuthHeaders());
  }

  getCurrentUserId(): number | undefined {
    const currentUser = this.currentUserValue;
    return currentUser ? currentUser.id : undefined;
  }

  updateClient(id: number, user: any): Observable<UserDetails> {
    return this.authDAO.updateClient(id, user, this.getAuthHeaders());
  }

  private getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }
}
