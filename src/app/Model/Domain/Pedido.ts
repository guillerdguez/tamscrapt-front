import { Cliente } from './Cliente';
import { Producto } from './Producto'; 
export interface Pedido {
    id?: number;
    precio: number;
    fechaCreacion: Date;
    cliente?: Cliente;
    productos: Set<Producto>;

    // addProducto(producto: Producto, cantidad: number): void;
    // removeProducto(producto: Producto): void;
    // imprimirProductos(): string;
}
