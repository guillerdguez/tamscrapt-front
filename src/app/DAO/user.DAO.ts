import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../Model/Domain/User/UserClass';
@Injectable({
  providedIn: 'root',
})
export class UserDAO {
  private urlBase = 'http://localhost:8082/api/clientes';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private http: HttpClient) {}
  //CREATE
  addUser(user: User): Observable<User> {
    const urlMod = `${this.urlBase}/addCliente`;
    return this.http.post<User>(urlMod, user, this.httpOptions);
  }
  //READ
  getUsers(): Observable<User[]> {
    const urlMod = `${this.urlBase}/listar`;
    return this.http.get<User[]>(urlMod);
  }
  getUser(id?: number): Observable<User> {
    const urlMod = `${this.urlBase}/ver/${id}`;
    return this.http.get<User>(urlMod);
  }
  //falta implementar en back
  findByName(term: string): Observable<User[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<User[]>(`${this.urlBase}/?name=${term}`);
  }
  //UPDATE
  updateUser(user: User): Observable<any> {
    console.log(user.id);
    const urlMod = `${this.urlBase}/editar/${user.id}`;
    return this.http.put(urlMod, user, this.httpOptions);
  }
  //DELETE
  deleteUser(id?: number): Observable<User> {
    const urlMod = `${this.urlBase}/borrar/${id}`;
    return this.http.delete<User>(urlMod, this.httpOptions);
  }
}
