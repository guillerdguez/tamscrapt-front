import { Injectable } from '@angular/core';
import { Producto } from '../Model/Domain/Producto';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ProductoDAO {
  private url = 'http://localhost:8082/api/producto';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private http: HttpClient) {}
  //CREATE
  addProducto(producto: Producto): Observable<Producto> {
    const url2 = `${this.url}/addProducto`;
    return this.http.post<Producto>(url2, producto, this.httpOptions);
  }
  //READ
  getProductos(): Observable<Producto[]> {
    const url2 = `${this.url}/listar`;
    return this.http.get<Producto[]>(url2);
  }

  getProducto(id: number): Observable<Producto> {
    const url2 = `${this.url}/ver/${id}`;
    return this.http.get<Producto>(url2);
  }

  getProductosLettering(): Observable<Producto[]> {
    const url2 = `${this.url}/lettering`;
    return this.http.get<Producto[]>(url2);
  }
  getProductosScrapbooking(): Observable<Producto[]> {
    const url2 = `${this.url}/scrapbooking`;
    return this.http.get<Producto[]>(url2);
  }
  getProductosOferta(): Observable<Producto[]> {
    const url2 = `${this.url}/ofertas`;
    return this.http.get<Producto[]>(url2);
  }
  //falta implementar en back
  findByName(term: string): Observable<Producto[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Producto[]>(`${this.url}/?name=${term}`);
  }
  // //UPDATE
  // updateProducto(producto: Producto): Observable<Producto> {
  //   const url2 = `${this.url}/editar/${producto.id}`;
  //   return this.http.put<Producto>(url2, producto, this.httpOptions);
  // }
  // UPDATE
  updateProducto(id: number, producto: Producto): Observable<Producto> {
    const url2 = `${this.url}/editar/${id}`;
    return this.http.put<Producto>(url2, producto, this.httpOptions);
  }
  //DELETE
  deleteProducto(id: number): Observable<Producto> {
    const url2 = `${this.url}/borrar/${id}`;
    return this.http.delete<Producto>(url2, this.httpOptions);
  }
}
