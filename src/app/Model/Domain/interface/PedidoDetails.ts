import { Producto } from '../Producto/ProductoClass';
import { User } from '../User/User.interface';

export interface PedidoDetails {
  id: number;
  precio: number;
  fechaCreacion: Date;
  cliente?: User;
  estado: string;
  productos: Producto[];
  tag: string;
}
