import { Injectable } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenuStrategy } from '../MenuStrategy';
import { CallbackUserService } from '../../../../../Service/Callbacks/CallbackUserService';
@Injectable({
  providedIn: 'root',
})
export class AdminUserMenuStrategy implements MenuStrategy {
  url: string = '/newUser';
  constructor(private callbacks: CallbackUserService) {}

  getMenuItems(context: any, selectedItems: any[]): MenuItem[] {
    return [
      {
        label: 'Crear',
        icon: 'pi pi-plus',

        command: () => this.callbacks.createUser(selectedItems),
      },
      {
        label: 'Eliminar',
        icon: 'pi pi-trash',
        command: () => this.callbacks.deleteUsers(selectedItems),
      },
      {
        label: 'Editar',
        icon: 'pi pi-pencil',
        command: () => this.callbacks.editUser(context),
      },
    ];
  }
}
