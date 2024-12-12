import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
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
  addProductoCarrito(id: number, cantidad: number = 1): Observable<any> {
    const urlMod = `${this.urlBase}/addProducto/${id}/${cantidad}`;
    return this.http.post<any>(urlMod, null, this.httpOptions);
  }
  //READ 
  getCarrito(userId: number | undefined): Observable<any[]> {
    const urlMod = `${this.urlBase}/productos/${userId}`;
    return this.http.get<any[]>(urlMod, this.httpOptions);
  }

  // UPDATE
  updateCarrito(id: number, carrito: any): Observable<any> {
    const urlMod = `${this.urlBase}/editar/${id}`;
    return this.http.put<any>(urlMod, carrito, this.httpOptions);
  }
  //DELETE
  deleteCarrito(id: number): Observable<any> {
    const urlMod = `${this.urlBase}/removeProducto/${id}`;
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
  // DELETE ALL PRODUCTS IN CART
  clearCart(): Observable<void> {
    const urlMod = `${this.urlBase}/clear`;
    return this.http.delete<void>(urlMod, this.httpOptions);
  }
}
