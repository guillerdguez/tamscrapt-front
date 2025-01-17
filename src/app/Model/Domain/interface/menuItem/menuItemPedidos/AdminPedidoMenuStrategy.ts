import { Injectable } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenuStrategy } from '../MenuStrategy';
import { CallbacksPedidoService } from '../../../../../Service/Callbacks/CallbacksPedidoService';

@Injectable({
  providedIn: 'root',
})
export class AdminPedidoMenuStrategy implements MenuStrategy {
  url: string = '/newPedido';
  constructor(private callbacks: CallbacksPedidoService) {}

  getMenuItems(context: any, selectedItems: any[]): MenuItem[] {
    return [
      {
        label: 'Eliminar',
        icon: 'pi pi-trash',
        command: () => this.callbacks.deletePedidos(selectedItems),
      },
      {
        label: 'Editar',
        icon: 'pi pi-pencil',
        command: () => this.callbacks.editPedido(context),
      },
      {
        label: 'CambiarEstado',
        icon: 'pi pi-pencil',
        command: () => this.callbacks.cambiarEstadoPedido(selectedItems),
      },
    ];
  }
}
