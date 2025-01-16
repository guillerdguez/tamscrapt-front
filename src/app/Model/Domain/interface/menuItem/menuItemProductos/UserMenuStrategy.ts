import { MenuItem } from 'primeng/api';
import { Injectable } from '@angular/core';
import { MenuStrategy } from '../MenuStrategy';
import { CallbacksProductoService } from '../../../../../Service/Callbacks/CallbacksProductoService';

@Injectable({
  providedIn: 'root',
})
export class UserMenuStrategy implements MenuStrategy {
  constructor(private callbacks: CallbacksProductoService) {}

  getMenuItems(context: any, selectedItems: any[]): MenuItem[] {
    return [
      // sirve para ver
      {
        label: 'Editar',
        icon: 'pi pi-pencil',
        command: () => this.callbacks.editProducto(context),
      },
      {
        label: 'Favorito',
        icon: 'pi pi-heart',
        command: () => this.callbacks.alternarFavorito(selectedItems),
      },
      {
        label: 'Carrito',
        icon: 'pi pi-shopping-cart',
        command: () => this.callbacks.alternarCart(selectedItems),
      },
    ];
  }
}
