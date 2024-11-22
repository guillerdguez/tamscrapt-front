// import { Injectable } from '@angular/core';
// import { Producto } from '../../Domain/ProductoClass';
// import { CarritoService } from '../../../Service/Carrito.service';

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
//     carritoService: CarritoService
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
