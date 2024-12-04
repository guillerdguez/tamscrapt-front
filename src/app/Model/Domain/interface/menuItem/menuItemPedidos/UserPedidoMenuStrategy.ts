import { Injectable } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenuStrategy } from '../MenuStrategy';
import { CallbacksPedidoService } from '../../../../../Service/Callbacks/CallbacksPedidoService';

@Injectable({
  providedIn: 'root',
})
export class UserPedidoMenuStrategy implements MenuStrategy {
  constructor(private callbacks: CallbacksPedidoService) {}

  getMenuItems(context: any, selectedItems: any[]): MenuItem[] {
    return [
      {
        // seria mejor algo como ir a pagar?
        label: 'Crear',
        icon: 'pi pi-plus',

        command: () => this.callbacks.createPedido(),
      },
      {
        label: 'Ver Pedido',
        icon: 'pi pi-eye',
        command: () => this.callbacks.editPedido(context),
      },

      {
        label: 'Confirmar Pedido',
        icon: 'pi pi-check',
        command: () => this.callbacks.confirmarPedido(),
      },
    ];
  }
}
