import { Injectable, Injector } from '@angular/core';
import { AuthService } from '../../../Service/seguridad/AuthService.service';
import { MenuStrategyFactory } from '../../Domain/interface/menuItem/MenuStrategyFactory';
import { GenericModel } from './GenericModel';
import { Pedido } from '../../Domain/Pedido/PedidoClass';
import { CallbacksPedidoService } from '../../../Service/Callbacks/CallbacksPedidoService';

@Injectable({ providedIn: 'root' })
export class PedidoModel {
  pedidos: Pedido[] = [];
  pedido: Pedido | undefined;
  private callbacksService!: CallbacksPedidoService;

  constructor(
    private menuStrategyFactory: MenuStrategyFactory,
    private genericModel: GenericModel,
    private injector: Injector,
    public authService: AuthService
  ) {
    this.callbacksService = this.injector.get(CallbacksPedidoService);
  }
  getTag(pedido: Pedido): string {
    return pedido.estado === 'CANCELADO'
      ? 'CANCELLED'
      : pedido.estado === 'PENDIENTE'
      ? 'PENDING'
      : pedido.estado === 'COMPLETADO'
      ? 'COMPLETED'
      : 'UNKNOWN';
  }

  getSeverity(pedido: Pedido): string | null {
    return (
      {
        CANCELLED: 'danger',
        PENDING: 'warning',
        COMPLETED: 'success',
        UNKNOWN: 'secondary',
      }[pedido.tag] || null
    );
  }

  getHeaders() {
    return [
      { class: 'id' },
      { class: 'precio' },
      { class: 'fechaCreacion' },
      { class: 'cliente' },
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
        this.genericModel.elementsSeleccionados,
        this.callbacksService
      );

      this.getSeverity(newPedido);
      listaPedido.push(newPedido);
    });
    return listaPedido;
  }
}
