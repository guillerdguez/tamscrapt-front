import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Producto } from '../../Model/Domain/Producto/ProductoClass';
import { ProductoService } from '../producto/Producto.service';
import { CartService } from '../carrito/CartService';
import { UserService } from '../user/User.service';

@Injectable({
  providedIn: 'root',
})
export class CallbacksProductoService {
  openOfertaDialog$ = new Subject<Producto[]>();

  constructor(
    private router: Router,
    private productoService: ProductoService,
    private cartService: CartService,
    private userService: UserService
  ) {}

  createProducto(selectedItems: Producto[]) {
    this.router.navigate(['/newProducto']);
    this.productoService.addProducto(selectedItems);
  }

  deleteProductos(selectedItems: Producto[]) {
    this.productoService.deleteMultipleProductos(selectedItems);
  }

  editProductos(selectedItems: Producto[]) {
    this.productoService.editMultipleProductos(selectedItems);
  }
//si no es admin solo puede tener el ultimo,que escribiendo en la url el id del producto funcione
  editProducto(producto: Producto | any[]) {
    const productoNoArray = Array.isArray(producto) ? producto[0] : producto;
 
    this.router.navigate(['/detail/Productos/', productoNoArray.id]);

    // Luego, si quieres alguna lógica adicional, podrías ejecutarla directo:
    // this.productoService.updateProducto(productoNoArray.id, productoNoArray);
    // O crear un método 'editSingleProducto' en productoService, etc.
  }

  alternarOferta(selectedItems: Producto[]) {
    this.openOfertaDialog$.next(selectedItems);
  }

  viewProducto(producto: Producto) {
    this.productoService.getProducto(producto.id);
  }

  alternarFavorito(selectedItems: Producto[]) {
    this.userService.alternarFavorito(selectedItems);
  } 
  alternarCart(selectedItems: Producto[]): void {
     this.cartService.alternarCart(selectedItems);
  }
}
