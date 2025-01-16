import { Injectable, Injector } from '@angular/core';
import { AuthService } from '../../../Service/seguridad/AuthService.service';
import { MenuStrategyFactory } from '../../Domain/interface/menuItem/MenuStrategyFactory';
import { GenericModel } from './GenericModel';
import { Pedido } from '../../Domain/Pedido/PedidoClass';
import { EstadoPedido } from '../../Domain/Pedido/EstadoPedido';
@Injectable({ providedIn: 'root' })
export class PedidoModel {
  pedidos: Pedido[] = [];
  pedido: Pedido | undefined;

  constructor(
    private menuStrategyFactory: MenuStrategyFactory,
    private genericModel: GenericModel,
    private injector: Injector,
    public authService: AuthService
  ) {}

  getTag(pedido: Pedido): string {
    const tag =
      pedido.estado === EstadoPedido.CANCELADO
        ? EstadoPedido.CANCELADO
        : pedido.estado === EstadoPedido.PENDIENTE
        ? EstadoPedido.PENDIENTE
        : pedido.estado === EstadoPedido.COMPLETADO
        ? EstadoPedido.COMPLETADO
        : EstadoPedido.DESCONOCIDO;

    pedido.tag = tag; // Asigna el tag al objeto Pedido
    return tag;
  }

  getSeverity(pedido: Pedido): string | null {
    return (
      {
        [EstadoPedido.CANCELADO]: 'danger',
        [EstadoPedido.PENDIENTE]: 'warning',
        [EstadoPedido.COMPLETADO]: 'success',
        [EstadoPedido.DESCONOCIDO]: 'secondary',
      }[pedido.tag] || null
    );
  }

  getHeaders() {
    return [
      { class: 'id' },
      { class: 'precio' },
      { class: 'fechaCreacion' },
      { class: 'nombreComprador' },

      // { class: 'productos' },
    ];
  }

  crearPedidos(Pedidos: Pedido[]): Pedido[] {
    const listaPedido: Pedido[] = [];
    Pedidos.forEach((pedido) => {
      const newPedido = new Pedido(this.menuStrategyFactory, this);
      newPedido.getParametros(pedido);
      newPedido.tag = this.getTag(newPedido);

      newPedido.menuItems = newPedido.getMenuItems(
        this.genericModel.elementsSeleccionados
      );

      this.getSeverity(newPedido);
      listaPedido.push(newPedido);
    });
    return listaPedido;
  }
}
