// import { Injectable } from '@angular/core';
// import { Producto } from '../../Domain/Producto/ProductoClass';

import { Producto } from '../../Domain/Producto/ProductoClass';

// @Injectable({
//   providedIn: 'root',
// })
// export class CarritoModel {
//   productos: Producto[] = [];
//   carrito: any;
//   total: number = 0;
//   pedido: any;

//   constructor() {}

//   crearProductos(
//     productos: Producto[],
//     carritoService: CartService
//   ): Producto[] {
//     let listaProductos: Producto[] = [];
//     productos.forEach((producto) =>
//       listaProductos.push(
//         new Producto(
//           producto.id,
//           producto.nombre,
//           producto.categoria,
//           producto.precio,
//           producto.cantidad
//         )
//       )
//     );
//     return listaProductos;
//   }
// }

export class Carrito {
  // productos: { producto: Producto; cantidad: number }[] = [];
  // agregarProducto(producto: Producto, cantidad: number = 1): void { alert("llega")
  //   const item = this.productos.find((p) => p.producto.id === producto.id);
  //   if (item) {
  //     item.cantidad += cantidad;
  //   } else {
  //     this.productos.push({ producto, cantidad });
  //   }
  // }
  // actualizarCantidad(productoId: number, cantidad: number): void {
  //   const item = this.productos.find((p) => p.producto.id === productoId);
  //   if (item) {
  //     item.cantidad = cantidad;
  //     if (item.cantidad <= 0) {
  //       this.eliminarProducto(productoId);
  //     }
  //   }
  // }
  // eliminarProducto(productoId: number): void {
  //   this.productos = this.productos.filter((p) => p.producto.id !== productoId);
  // }
  // vaciar(): void {
  //   this.productos = [];
  // }
  // obtenerTotal(): number {
  //   return this.productos.reduce(
  //     (total, item) => total + item.producto.precio * item.cantidad,
  //     0
  //   );
  // }
}
