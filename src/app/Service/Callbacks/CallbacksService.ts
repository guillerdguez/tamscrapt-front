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
  editProductos$ = new Subject<Producto[]>();
  editProducto$ = new Subject<any>();
  viewProducto$ = new Subject<Producto>();
  toggleOfertas$ = new Subject<Producto[]>();
  toggleFavorito$ = new Subject<Producto[]>();
  openOfertaDialog$ = new Subject<Producto[]>();

  url: string = '/newProducto';

  constructor(private router: Router) {}

  createProducto() {
    this.router.navigate([this.url]);
    this.createProducto$.next();
  }

  deleteProductos(selectedItems: Producto[]) {
    this.deleteProductos$.next(selectedItems);
  }
  editProductos(selectedItems: Producto[]) {
    this.editProductos$.next(selectedItems);
  }

  editProducto(producto: Producto | any[]) {
    let productoNoArray;
    if (Array.isArray(producto)) {
      productoNoArray = producto[0];
    } else {
      productoNoArray = producto;
    }
    this.router.navigate(['/detail/Productos/', productoNoArray.id]);
    this.editProducto$.next(producto);
  }
  toggleOferta(selectedItems: Producto[]) {
    this.openOfertaDialog$.next(selectedItems);
  }

  viewProducto(producto: Producto) {
    this.viewProducto$.next(producto);
  }
  // toggleOferta(selectedItems: Producto[]) {
  //   console.log('toggleOferta emitido con:', selectedItems);
  //   this.toggleOfertas$.next(selectedItems);
  // }

  // toggleOferta(producto: Producto[]) {
  //   let productoNoArray;
  //   if (Array.isArray(producto)) {
  //     productoNoArray = producto[0];
  //   } else {
  //     productoNoArray = producto;
  //   }
  //   this.router.navigate(['/prueba/']);
  //   console.log(producto);
  //   this.toggleOfertas$.next(producto);
  // }
  toggleFavorito(selectedItems: Producto[]) {
    this.toggleFavorito$.next(selectedItems);
  }
}
