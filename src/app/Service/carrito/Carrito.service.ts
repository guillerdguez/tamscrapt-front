// import { Injectable } from '@angular/core';
// import { CarritoDAO } from '../DAO/carrito.DAO';
// import { Observable } from 'rxjs';

// import { Producto } from '../Model/Domain/ProductoClass';

// @Injectable({
//   providedIn: 'root',
// })
// export class CarritoService {
//   constructor(
//     private carritoDAO: CarritoDAO,
//     public carritoModel: CarritoModel
//   ) {}

//   // ADD PRODUCT TO CART
//   addProductoCarrito(id: number, carrito: any): void {
//     this.carritoDAO.addProductoCarrito(id, carrito).subscribe({
//       next: (carritoActualizado: any) => {
//         this.carritoModel.carrito = carritoActualizado;
//       },
//       error: (error) => {
//         console.error(
//           'Error al agregar producto al carrito:',
//           error.message,
//           error
//         );
//       },
//     });
//   }

//   // GET CART PRODUCTS
//   getCarrito(): void {
//     this.carritoDAO.getCarrito().subscribe({
//       next: (productos: Producto[]) => {
//         this.carritoModel.productos = productos;
//       },
//       error: (error) => {
//         console.error(
//           'Error al obtener los productos del carrito:',
//           error.message,
//           error
//         );
//       },
//     });
//   }

//   // UPDATE CART
//   updateCarrito(id: number, carrito: any): void {
//     this.carritoDAO.updateCarrito(id, carrito).subscribe({
//       next: (carritoActualizado: any) => {
//         this.carritoModel.carrito = carritoActualizado;
//       },
//       error: (error) => {
//         console.error('Error al actualizar el carrito:', error.message, error);
//       },
//     });
//   }

//   // REMOVE PRODUCT FROM CART
//   deleteProductoCarrito(id: number): void {
//     this.carritoDAO.deleteCarrito(id).subscribe({
//       next: () => {
//         this.carritoModel.productos = this.carritoModel.productos.filter(
//           (producto) => producto.id !== id
//         );
//       },
//       error: (error) => {
//         console.error(
//           'Error al eliminar producto del carrito:',
//           error.message,
//           error
//         );
//       },
//     });
//   }

//   // GET CART TOTAL
//   getTotalCarrito(): void {
//     this.carritoDAO.getTotalCarrito().subscribe({
//       next: (total: number) => {
//         this.carritoModel.total = total;
//       },
//       error: (error) => {
//         console.error(
//           'Error al obtener el total del carrito:',
//           error.message,
//           error
//         );
//       },
//     });
//   }

//   // CREATE ORDER FROM CART
//   crearPedidoDesdeCarrito(): void {
//     this.carritoDAO.crearPedidoDesdeCarrito().subscribe({
//       next: (pedido: any) => {
//         this.carritoModel.pedido = pedido;
//         // Podría agregar alguna lógica para vaciar el carrito tras crear el pedido
//         this.carritoModel.productos = [];
//       },
//       error: (error) => {
//         console.error(
//           'Error al crear el pedido desde el carrito:',
//           error.message,
//           error
//         );
//       },
//     });
//   }
// }
