import { MenuItem } from 'primeng/api';
import { Injectable } from '@angular/core';
import { CallbacksService } from '../../../../../Service/Callbacks/CallbacksService';
import { MenuStrategy } from '../MenuStrategy';

@Injectable({
  providedIn: 'root',
})
export class UserMenuStrategy implements MenuStrategy {
  constructor(private callbacks: CallbacksService) {}

  getMenuItems(context: any, selectedItems: any[]): MenuItem[] {
    return [
      {
        label: 'Editar',
        icon: 'pi pi-eye',
        command: () => this.callbacks.editProducto(context),
      },
      {
        label: 'Favorito',
        icon: 'pi pi-heart',
        command: () => this.callbacks.toggleFavorito(selectedItems),
       
      },
    ];
  }
}
