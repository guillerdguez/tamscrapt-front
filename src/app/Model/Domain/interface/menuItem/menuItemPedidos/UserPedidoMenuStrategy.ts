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

        label: 'Crear',
        icon: 'pi pi-plus',

        command: () => this.callbacks.createPedido(),
      },
      {
        label: 'Ver',
        icon: 'pi pi-eye',
        command: () => this.callbacks.editPedido(context),
      },

      {
        label: 'Eliminar',
        icon: 'pi pi-check',
        command: () => this.callbacks.deletePedidos(selectedItems),
      },
    ];
  }
}
