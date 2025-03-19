import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserDetails } from '../../Model/Domain/interface/UserDetails';
import { UserAuthority } from '../../Model/Domain/User/UserAuthority.enum';
import { AuthDAO } from '../../DAO/Auth.DAO';
import { GenericModel } from '../../Model/Views/Dynamic/GenericModel';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<UserDetails | null>;
  public currentUser$: Observable<UserDetails | null>;

  constructor(
    private authDAO: AuthDAO,
    private router: Router,
    private genericModel: GenericModel
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
        this.genericModel.element = [];
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

  getCurrentUserId(): number | undefined {
    const currentUser = this.currentUserValue;
    return currentUser ? currentUser.id : undefined;
  }

 
}
