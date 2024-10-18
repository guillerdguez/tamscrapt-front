 
import { Pedido } from '../Model/Domain/Pedido';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class PedidoDAO {
  private url = 'http://localhost:8082/api/pedidos/';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private http: HttpClient) {}
  //CREATE
  addPedido(pedido: Pedido): Observable<Pedido> {
    const url2 = `${this.url}/addPedido`;
    return this.http.post<Pedido>(url2, pedido, this.httpOptions);
  }
  //READ
  getPedidos(): Observable<Pedido[]> {
    const url2 = `${this.url}/listar`;
    return this.http.get<Pedido[]>(url2);
  }
  getPedido(id: number): Observable<Pedido> {
    const url2 = `${this.url}/ver/${id}`;
    return this.http.get<Pedido>(url2);
  }
  //falta implementar en back
  findByName(term: string): Observable<Pedido[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Pedido[]>(`${this.url}/?name=${term}`);
  }
  //UPDATE
  updatePedido(pedido: Pedido): Observable<any> {
    const url2 = `${this.url}/editar/${pedido.getId()}`;
    return this.http.put(url2, pedido, this.httpOptions);
  }
  addProductos(pedidoId: number, productoIds: number[], cantidades: number[]): Observable<Pedido> {
    const url2 = `${this.url}/addProducto/${pedidoId}`;
    const body = { productoIds, cantidades };
    return this.http.post<Pedido>(url2, body, this.httpOptions);
  }
  removeProducto(pedidoId: number, productoId: number): Observable<Pedido>  {
    const url2 = `${this.url}/removeProducto/${pedidoId}/${productoId}`;
    const body = { pedidoId, productoId };
    return this.http.post<Pedido>(url2, body, this.httpOptions);
  }
  
  //DELETE
  deletePedido(id: number): Observable<Pedido> {
    const url2 = `${this.url}/borrar/${id}`;
    return this.http.delete<Pedido>(url2, this.httpOptions);
  }
  
}
