import { MenuItem } from 'primeng/api';
import { PedidoModel } from '../../Views/Dynamic/PedidoModel';
import { MenuStrategy } from '../interface/menuItem/MenuStrategy';
import { MenuStrategyFactory } from '../interface/menuItem/MenuStrategyFactory';
import { PedidoDetails } from '../interface/PedidoDetails';
import { ProductoPedido } from '../interface/producto-pedido';

export class Pedido {
  id?: number;
  precio: number = 0;
  fechaCreacion!: string;
  cliente?: any;
  estado!: string;
  productos!: ProductoPedido[];
  menuItems!: MenuItem[];
  direccionEnvio!: string;
  metodoPago!: string;
  tag!: string;
  private menuStrategy!: MenuStrategy;
  strategia: string = 'pedido';
  nombreComprador!: string;

  constructor(
    public menuStrategyFactory: MenuStrategyFactory,
    public pedidoModel: PedidoModel
  ) {
    this.menuStrategy = this.menuStrategyFactory.getStrategy(this.strategia);
  }
  getHeaders() {
    return this.pedidoModel.getHeaders();
  }

  // Devuelve el nivel de severidad según el modelo del pedido
  getSeverity() {
    return this.pedidoModel.getSeverity(this);
  }

  getMenuItems(selectedItems: Pedido[]): MenuItem[] {
    return this.menuStrategy.getMenuItems(this, selectedItems);
  }

  getParametros(pedido: Pedido) {
    this.id = pedido.id;
    this.precio = pedido.precio;
    this.fechaCreacion = pedido.fechaCreacion;
    this.cliente = pedido.cliente;
    this.estado = pedido.estado;
    this.productos = pedido.productos;
    this.direccionEnvio = pedido.direccionEnvio;
    this.metodoPago = pedido.metodoPago;
    this.tag = pedido.tag;
    this.nombreComprador = pedido.nombreComprador;
    return this;
  }

  // Modificación de `getPedidoData` para devolver solo las propiedades simplificadas del pedido
  getPedidoData(): PedidoDetails {
    return {
      id: this.id,
      precio: this.precio,
      fechaCreacion: this.fechaCreacion,
      cliente: this.cliente,
      estado: this.estado,
      productos: this.productos,
      direccionEnvio: this.direccionEnvio,
      metodoPago: this.metodoPago,
      nombreComprador: this.nombreComprador,
    };
  }
}
