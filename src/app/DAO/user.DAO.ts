import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../Model/Domain/User/UserClass';
import { Producto } from '../Model/Domain/Producto/ProductoClass';
@Injectable({
  providedIn: 'root',
})
export class UserDAO {
  // private urlBase = 'http://localhost:8082/api/clientes';
  private urlBase =
    'https://tamscrap-back-production.up.railway.app/api/clientes';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private http: HttpClient) {}

  addUser(user: User): Observable<User> {
    const urlMod = `${this.urlBase}/addCliente`;
    return this.http.post<User>(urlMod, user, this.httpOptions);
  }

  getUsers(): Observable<User[]> {
    const urlMod = `${this.urlBase}/listar`;
    return this.http.get<User[]>(urlMod);
  }
  getUser(id?: number): Observable<User> {
    const urlMod = `${this.urlBase}/ver/${id}`;
    return this.http.get<User>(urlMod);
  }
  findByName(term: string): Observable<User[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<User[]>(`${this.urlBase}/?name=${term}`);
  }
  updateUser(user: User): Observable<any> {
    const urlMod = `${this.urlBase}/editar/${user.id}`;
    return this.http.put(urlMod, user, this.httpOptions);
  }
  deleteUser(id?: number): Observable<User> {
    const urlMod = `${this.urlBase}/borrar/${id}`;
    return this.http.delete<User>(urlMod, this.httpOptions);
  }
  agregarFavorito(clienteId: number, productoId: number): Observable<string> {
    const urlMod = `${this.urlBase}/${clienteId}/favorito/${productoId}`;
    return this.http.post<string>(urlMod, {}, this.httpOptions);
  }

  eliminarFavorito(clienteId: number, productoId: number): Observable<string> {
    const urlMod = `${this.urlBase}/${clienteId}/favorito/${productoId}`;
    return this.http.delete<string>(urlMod, this.httpOptions);
  }

  obtenerFavoritos(clienteId: number): Observable<Producto[]> {
    const urlMod = `${this.urlBase}/${clienteId}/favoritos`;
    return this.http.get<Producto[]>(urlMod);
  }
}
