import { ProductoPedido } from './producto-pedido';

export interface PedidoDetails {
  id?: number;
  precio: number;
  fechaCreacion: string;
  cliente?: { id: number };
  estado: string;
  productos: ProductoPedido[];
  direccionEnvio: string;
  metodoPago: string;
  nombreComprador: string;
}
