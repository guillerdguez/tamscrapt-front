// import { Component } from '@angular/core';
// import { ProductoService } from '../../../../Service/producto/Producto.service';
// import { Producto } from '../../../../Model/Domain/Producto/ProductoClass';
// import { GenericModel } from '../../../../Model/Views/Dynamic/GenericModel';

// @Component({
//   selector: 'app-admin-pedidos',
//   templateUrl: './admin-pedidos.component.html',
//   styleUrl: './admin-pedidos.component.css',
// })
// export class AdminPedidosComponent {
//   calcularPrecioOriginal(
//     precioConDescuento: number,
//     descuento: number
//   ): number {
//     return parseFloat((precioConDescuento / (1 - descuento / 100)).toFixed(2));
//   }

//   constructor(
//     private productoService: ProductoService,
//     public productoModel: GenericModel
//   ) {
//     // this.isAdmin = this.checkIfUserIsAdmin();
//   }
//   ngOnInit(): void {
//     // this.productoService.getProductos();
//   }

//   add(arg0: string) {
//     throw new Error('Method not implemented.');
//   }
//   delete(element: Producto): void {
//     this.productoModel.elements = this.productoModel.elements.filter(
//       (h) => h !== element
//     );
//     this.productoService.deleteProducto(element.id);
//   }
// }
