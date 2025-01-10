import { Injectable } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenuStrategy } from '../MenuStrategy';
import { CallbacksProductoService } from '../../../../../Service/Callbacks/CallbacksProductoService';
@Injectable({
  providedIn: 'root',
})
export class AdminMenuStrategy implements MenuStrategy {
  url: string = '/newProducto';
  constructor(private callbacks: CallbacksProductoService) {}

  getMenuItems(context: any, selectedItems: any[]): MenuItem[] {
    return [
      {
        label: 'Crear',
        icon: 'pi pi-plus',

        command: () => this.callbacks.createProducto(),
      },
      {
        label: 'Eliminar',
        icon: 'pi pi-trash',
        command: () => this.callbacks.deleteProductos(selectedItems),
      },
      {
        label: 'Editar',
        icon: 'pi pi-pencil',
        command: () => this.callbacks.editProducto(context),
      },
      {
        label: 'Oferta',
        icon: 'pi pi-tag',
        command: () => this.callbacks.toggleOferta(selectedItems),
      },
    ];
  }
}
