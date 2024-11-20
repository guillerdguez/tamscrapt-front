// import { Injectable } from '@angular/core';
// import { Producto } from '../../Domain/ProductoClass';

// @Injectable({ providedIn: 'root' })
// export class AlgoModel {
//   constructor() {}
//   productos: Producto[] = [];
//   producto: Producto | undefined;
//   productosSeleccionadas: Producto[] = [];
//   menuItemSeleccionado!: any;

//   ejecutarMenuItem() {
//     this.productosSeleccionadas.forEach((producto) => {
//       if (this.menuItemSeleccionado) {
//         let opciones = producto.getMenuItemsAdmin(producto.getUrl());

//         let opcion = opciones.find(
//           (opcion) => opcion.label == this.menuItemSeleccionado
//         );

//         opcion?.command();
//       }
//     });
//     this.productosSeleccionadas = [];
//   }
// }
