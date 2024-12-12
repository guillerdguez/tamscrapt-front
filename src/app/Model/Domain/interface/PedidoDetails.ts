import { ProductoPedido } from './producto-pedido';

export interface PedidoDetails {
  id?: number; // ID autogenerado, opcional al crear un pedido
  precio: number; // Precio total del pedido
  fechaCreacion: string; // Fecha de creación en formato ISO (YYYY-MM-DDTHH:mm:ss)
  cliente?: { id: number }; // Cliente asociado al pedido (debe incluir un ID válido)
  estado: string; // Estado del pedido (e.g., 'Pendiente', 'Completado')
  productos: ProductoPedido[]; // Lista de productos en el pedido
  direccionEnvio: string; // Dirección de envío
  metodoPago: string; // Método de pago (e.g., 'creditCard', 'cash')
}
