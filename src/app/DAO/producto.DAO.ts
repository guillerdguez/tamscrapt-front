import { Injectable } from '@angular/core';
import { Producto } from '../Model/Domain/ProductoClass';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ProductoDAO {
  private urlBase = 'http://localhost:8082/api/producto';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private http: HttpClient) {}
  //CREATE
  addProducto(producto: Producto): Observable<Producto> {
    const urlMod = `${this.urlBase}/addProducto`;
    return this.http.post<Producto>(urlMod, producto, this.httpOptions);
  }
  //READ
  getProductos(): Observable<Producto[]> {
    const urlMod = `${this.urlBase}/listar`;
    return this.http.get<Producto[]>(urlMod);
  }

  getProducto(id: number): Observable<Producto> {
    const urlMod = `${this.urlBase}/ver/${id}`;
    return this.http.get<Producto>(urlMod);
  }

  getProductosLettering(): Observable<Producto[]> {
    const urlMod = `${this.urlBase}/lettering`;
    return this.http.get<Producto[]>(urlMod);
  }
  getProductosScrapbooking(): Observable<Producto[]> {
    const urlMod = `${this.urlBase}/scrapbooking`;
    return this.http.get<Producto[]>(urlMod);
  }
  getProductosOferta(): Observable<Producto[]> {
    const urlMod = `${this.urlBase}/ofertas`;
    return this.http.get<Producto[]>(urlMod);
  }
  //falta implementar en back
  findByName(term: string): Observable<Producto[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Producto[]>(`${this.urlBase}/?name=${term}`);
  }
 
  // UPDATE
  updateProducto(id: number , producto: Producto): Observable<Producto> {
    const urlMod = `${this.urlBase}/editar/${id}`;
    return this.http.put<Producto>(urlMod, producto, this.httpOptions);
  }
  //DELETE
  deleteProducto(id: number): Observable<Producto> {
    const urlMod = `${this.urlBase}/borrar/${id}`;
    return this.http.delete<Producto>(urlMod, this.httpOptions);
  }
}
