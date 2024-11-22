import { Injectable } from '@angular/core';
// import { Carrito } from '../Model/Domain/CarritoClass';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root',
})

//base de datos para carrito ?
export class CarritoDAO {
  private urlBase = 'http://localhost:8082/api/carrito';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private http: HttpClient) {}

  // ADD PRODUCT TO CART
  addProductoCarrito(id: number, carrito: any): Observable<any> {
    const urlMod = `${this.urlBase}/addProducto/${id}`;
    return this.http.post<any>(urlMod, carrito, this.httpOptions);
  }
  //READ
  getCarrito(): Observable<any[]> {
    const urlMod = `${this.urlBase}/productos`;
    return this.http.get<any[]>(urlMod);
  }

  // UPDATE
  updateCarrito(id: number, carrito: any): Observable<any> {
    const urlMod = `${this.urlBase}/editar/${id}`;
    return this.http.put<any>(urlMod, carrito, this.httpOptions);
  }
  //DELETE
  deleteCarrito(id: number): Observable<any> {
    const urlMod = `${this.urlBase}/removeProducto/{id}`;
    return this.http.delete<any>(urlMod, this.httpOptions);
  }
  // GET CART TOTAL
  getTotalCarrito(): Observable<number> {
    const urlMod = `${this.urlBase}/checkout/total`;
    return this.http.get<number>(urlMod, this.httpOptions);
  }

  // CREATE ORDER FROM CART
  crearPedidoDesdeCarrito(): Observable<any> {
    const urlMod = `${this.urlBase}/checkout/detalles`;
    return this.http.get<any>(urlMod, this.httpOptions);
  }
}
