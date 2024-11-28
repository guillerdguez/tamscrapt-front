import { MenuItem } from 'primeng/api';
import { Injectable } from '@angular/core';
import { CallbacksService } from '../../../../Service/CallbacksService';
import { MenuStrategy } from './MenuStrategy';

@Injectable({
  providedIn: 'root',
})
export class UserMenuStrategy implements MenuStrategy {
  constructor(private callbacks: CallbacksService) {}

  getMenuItems(context: any, selectedItems: any[]): MenuItem[] {
    return [
      {
        label: 'Ver',
        icon: 'pi pi-eye',
        command: () => this.callbacks.viewProducto(context),
      },
      {
        label: 'Favorito',
        icon: 'pi pi-heart',
        command: () => this.callbacks.toggleFavorito(selectedItems),
        disabled: selectedItems.length === 0,
      },
    ];
  }
}
