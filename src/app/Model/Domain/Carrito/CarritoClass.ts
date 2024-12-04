// import { Producto } from './ProductoClass';

// import { Pedido } from './PedidoClass';

// export class Carrito {
//   productos: Producto[] = [];
//   total: number = 0;
//   pedido: Pedido | undefined;

//   constructor() {}

//   // Agrega un producto al carrito
//   agregarProducto(producto: Producto): void {
//     this.productos.push(producto);
//     this.calcularTotal();
//   }

//   // Elimina un producto del carrito
//   eliminarProducto(productId: number): void {
//     this.productos = this.productos.filter(
//       (producto) => producto.id !== productId
//     );
//     this.calcularTotal();
//   }

//   // Calcula el precio total del carrito
//   calcularTotal(): void {
//     // this.total = this.productos.reduce(
//     // //   (acc, producto) => acc + producto.precio * (producto.cantidad || 1),
//     //   0
//     // );
//   }

//   // Crea un pedido basado en los productos en el carrito
//   crearPedido(): void {
//     // const nuevoPedido = new Pedido();
//     // nuevoPedido.productos = [...this.productos];
//     // nuevoPedido.calcularPrecio();
//     // this.pedido = nuevoPedido;
//     // return nuevoPedido;
//   }

//   // Vacía el carrito después de realizar el pedido
//   vaciarCarrito(): void {
//     this.productos = [];
//     this.total = 0;
//   }
// }
