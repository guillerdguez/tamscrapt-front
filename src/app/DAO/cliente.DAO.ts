import { Injectable } from '@angular/core';
import { Cliente } from '../Model/Domain/Cliente';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ClienteDAO {
  private url = 'http://localhost:8082/api/clientes';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private http: HttpClient) {}
  //CREATE
  addCliente(cliente: Cliente): Observable<Cliente> {
    const url2 = `${this.url}/addCliente`;
    return this.http.post<Cliente>(url2, cliente, this.httpOptions);
  }
  //READ
  getClientes(): Observable<Cliente[]> {
    const url2 = `${this.url}/listar`;
    return this.http.get<Cliente[]>(url2);
  }
  getCliente(id: number): Observable<Cliente> {
    const url2 = `${this.url}/ver/${id}`;
    return this.http.get<Cliente>(url2);
  }
  //falta implementar en back
  findByName(term: string): Observable<Cliente[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Cliente[]>(`${this.url}/?name=${term}`);
  }
  //UPDATE
  updateCliente(cliente: Cliente): Observable<any> {
    const url2 = `${this.url}/editar/${cliente.id}`;
    return this.http.put(url2, cliente, this.httpOptions);
  }
  //DELETE
  deleteCliente(id: number): Observable<Cliente> {
    const url2 = `${this.url}/borrar/${id}`;
    return this.http.delete<Cliente>(url2, this.httpOptions);
  }
}
