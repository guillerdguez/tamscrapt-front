import { MenuItem } from 'primeng/api';
import { CallbacksPedidoService } from '../../../Service/Callbacks/CallbacksPedidoService';
import { PedidoModel } from '../../Views/Dynamic/PedidoModel';
import { MenuStrategy } from '../interface/menuItem/MenuStrategy';
import { MenuStrategyFactory } from '../interface/menuItem/MenuStrategyFactory';
import { User } from '../User/User.interface';
import { Producto } from '../Producto/ProductoClass';
import { PedidoDetails } from '../interface/PedidoDetails';

export class Pedido {
  id!: number;
  precio: number = 0;
  fechaCreacion!: Date;
  cliente?: User;
  estado!: string;
  productos!: Producto[];
  menuItems!: MenuItem[];

  tag!: string;
  private menuStrategy!: MenuStrategy;
  strategia: string = 'pedido';

  constructor(
    public menuStrategyFactory: MenuStrategyFactory,
    public pedidoModel: PedidoModel
  ) {
    this.menuStrategy = this.menuStrategyFactory.getStrategy(this.strategia);
  }
  calcularPrecioTotal(): number {
    return 1;
  }
  getHeaders() {
    return this.pedidoModel.getHeaders();
  }

  // Devuelve el nivel de severidad según el modelo del pedido
  getSeverity() {
    return this.pedidoModel.getSeverity(this);
  }

  delete(): void {
    // Lógica para eliminar el pedido
    console.log(`Eliminando pedido con ID: ${this.id}`);
  }

  getMenuItems(
    selectedItems: Pedido[],
    callbacks: CallbacksPedidoService
  ): MenuItem[] {
    return this.menuStrategy.getMenuItems(this, selectedItems, callbacks);
  }

  getParametros(pedido: Pedido) {
    this.id = pedido.id;
    this.precio = pedido.precio;
    this.fechaCreacion = pedido.fechaCreacion;
    this.cliente = pedido.cliente;
    this.estado = pedido.estado;
    this.productos = pedido.productos;
    this.tag = pedido.tag ?? 'UNKNOWN'; // Aseguramos que 'tag' tenga un valor predeterminado si es nulo
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
      tag: this.tag,
    };
  }
}
