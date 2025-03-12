import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Pedido } from '../Model/Domain/Pedido/PedidoClass';
@Injectable({
  providedIn: 'root',
})
export class PedidoDAO {
  private urlBase = 'http://tamscrap-back-production.up.railway.app:8080/api/pedidos';

  // private urlBase = 'http://localhost:8082/api/pedidos';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private http: HttpClient) {}
 
  addPedido(pedido: Pedido): Observable<Pedido> {
    const urlMod = `${this.urlBase}/addPedido`;

    return this.http.post<Pedido>(urlMod, pedido, this.httpOptions);
  }
  getPedidos(): Observable<Pedido[]> {
    const urlMod = `${this.urlBase}/listar`;
    return this.http.get<Pedido[]>(urlMod);
  }
  getPedidosPorCliente(): Observable<Pedido[]> {
    const urlMod = `${this.urlBase}/pedidosCliente`;
    return this.http.get<Pedido[]>(urlMod, this.httpOptions);
  }

  getPedido(id: number): Observable<Pedido> {
    const urlMod = `${this.urlBase}/ver/${id}`;
    return this.http.get<Pedido>(urlMod);
  }
  //falta implementar en back
  findByName(term: string): Observable<Pedido[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Pedido[]>(`${this.urlBase}/?name=${term}`);
  }
  updatePedido(pedido: Pedido): Observable<any> {
    console.log(pedido);
     const urlMod = `${this.urlBase}/editar/${pedido.id}`;
    return this.http.put(urlMod, pedido, this.httpOptions);
  }
  addProductos(
    pedidoId: number,
    productoIds: number[],
    cantidades: number[]
  ): Observable<Pedido> {
    const urlMod = `${this.urlBase}/addProducto/${pedidoId}`;
    const body = { productoIds, cantidades };
    return this.http.post<Pedido>(urlMod, body, this.httpOptions);
  }
  removeProducto(pedidoId: number, productoId: number): Observable<Pedido> {
    const urlMod = `${this.urlBase}/removeProducto/${pedidoId}/${productoId}`;
    const body = { pedidoId, productoId };
    return this.http.post<Pedido>(urlMod, body, this.httpOptions);
  }

  deletePedido(id: number): Observable<Pedido> {
    const urlMod = `${this.urlBase}/delete/${id}`;
    return this.http.delete<Pedido>(urlMod, this.httpOptions);
  }
}
