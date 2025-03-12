import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CarritoResponse } from '../Model/Domain/interface/CarritoResponse';
@Injectable({
  providedIn: 'root',
})

export class CarritoDAO {
  // private urlBase = 'http://localhost:8082/api/carrito';
  private urlBase = 'http://tamscrap-back-production.up.railway.app:8080/api/carrito';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private http: HttpClient) {}

 

  addProductoCarrito(id: number, cantidad: number = 1): Observable<any> {
     const urlMod = `${this.urlBase}/addProducto/${id}/${cantidad}`;
    return this.http.post<any>(urlMod, null, this.httpOptions);
  }

  getCarrito(userId: number | undefined): Observable<CarritoResponse> {
    const urlMod = `${this.urlBase}/productos/${userId}`;
    return this.http.get<CarritoResponse>(urlMod, this.httpOptions);
  }

  deleteCarrito(id: number): Observable<any> {
    const urlMod = `${this.urlBase}/removeProducto/${id}`;
    return this.http.delete<any>(urlMod, this.httpOptions);
  }
  getTotalCarrito(): Observable<number> {
    const urlMod = `${this.urlBase}/checkout/total`;
    return this.http.get<number>(urlMod, this.httpOptions);
  }

  crearPedidoDesdeCarrito(): Observable<any> {
    const urlMod = `${this.urlBase}/checkout/detalles`;
    return this.http.get<any>(urlMod, this.httpOptions);
  }

  clearCart(): Observable<void> {
    const urlMod = `${this.urlBase}/clear`;
    return this.http.delete<void>(urlMod, this.httpOptions);
  }
}
