import { Injectable } from '@angular/core';
import { Producto } from '../Model/Domain/Producto/ProductoClass';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductoDAO {
  private urlBase = 'http://localhost:8082/api/producto';
  private urlBaseCliente = 'http://localhost:8082/api/clientes';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  cargarFavoritos(clienteId: number): Observable<Producto[]> {
    console.log('favoritos', clienteId);
    return this.obtenerFavoritos(clienteId);
  }

  constructor(private http: HttpClient) {}

  // CREATE
  addProducto(producto: Producto): Observable<Producto> {
    const urlMod = `${this.urlBase}/addProducto`;
    return this.http.post<Producto>(urlMod, producto, this.httpOptions);
  }

  // READ
  getProductos(categoria?: string): Observable<Producto[]> {
    if (categoria) {
      const urlMod = `${this.urlBase}/listar?categoria=${encodeURIComponent(
        categoria
      )}`;
      return this.http.get<Producto[]>(urlMod);
    }
    const urlMod = `${this.urlBase}/listar`;
    return this.http.get<Producto[]>(urlMod);
  }
  getProducto(id: number): Observable<Producto> {
    const urlMod = `${this.urlBase}/ver/${id}`;
    return this.http.get<Producto>(urlMod);
  }

  // BUSCAR POR NOMBRE

  searchProductos(term: string): Observable<Producto[]> {
    const urlMod = `${this.urlBase}/buscar?name=${encodeURIComponent(term)}`;
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Producto[]>(urlMod);
  }

  // UPDATE
  updateProducto(id: number, producto: Producto): Observable<Producto> {
    const urlMod = `${this.urlBase}/editar/${id}`;
    return this.http.put<Producto>(urlMod, producto, this.httpOptions);
  }

  // DELETE
  deleteProducto(id: number): Observable<Producto> {
    const urlMod = `${this.urlBase}/borrar/${id}`;
    return this.http.delete<Producto>(urlMod, this.httpOptions);
  }

  // FAVORITOS
  obtenerFavoritos(clienteId: number): Observable<Producto[]> {
    const urlMod = `${this.urlBaseCliente}/${clienteId}/favoritos`;
    return this.http.get<Producto[]>(urlMod);
  }
}
