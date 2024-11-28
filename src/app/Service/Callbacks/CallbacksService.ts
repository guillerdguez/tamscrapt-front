import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Producto } from '../../Model/Domain/ProductoClass';

@Injectable({
  providedIn: 'root',
})
export class CallbacksService {
  createProducto$ = new Subject<void>();
  deleteProductos$ = new Subject<Producto[]>();
  editProducto$ = new Subject<any>();
  viewProducto$ = new Subject<Producto>();
  toggleOferta$ = new Subject<Producto[]>();
  toggleFavorito$ = new Subject<Producto[]>();

  url: string = '/newProducto';

  constructor(private router: Router) {}

  createProducto() {
    this.router.navigate([this.url]);
    this.createProducto$.next();
  }

  deleteProductos(selectedItems: Producto[]) {
    this.deleteProductos$.next(selectedItems);
  }

  editProducto(producto: Producto) {
    this.router.navigate(['/detail/Productos/', producto.id]);
    this.editProducto$.next(producto);
  }

  viewProducto(producto: Producto) {
    this.viewProducto$.next(producto);
  }
  toggleOferta(selectedItems: Producto[]) {
    console.log('toggleOferta emitido con:', selectedItems);
    this.toggleOferta$.next(selectedItems);
  }

  toggleFavorito(selectedItems: Producto[]) {
    this.toggleFavorito$.next(selectedItems);
  }
}
