 
import { Producto } from './ProductoClass';
import { User } from './User/UserClass';
export interface Pedido {
  id?: number;
  precio: number;
  fechaCreacion: Date;
  User?: User;
  productos: Set<Producto>;

  // addProducto(producto: Producto, cantidad: number): void;
  // removeProducto(producto: Producto): void;
  // imprimirProductos(): string;
}
