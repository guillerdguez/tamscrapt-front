import { Router } from '@angular/router';
import { AlgoModel } from '../../Views/Dynamic/AlgoModel';
import { UserAuthority } from '../UserAuthority.enum';
import { UserModel } from '../../Views/Dynamic/UserModel';
import { UserService } from '../../../Service/User.service';
import { MenuItem } from 'primeng/api';
import { UserDeails } from '../interface/UserDetails';
import { MenuStrategy } from '../interface/menuItem/MenuStrategy';
import { MenuStrategyFactory } from '../interface/menuItem/MenuStrategyFactory';
import { CallbacksService } from '../../../Service/Callbacks/CallbacksService';

export class User {
  id?: number;
  nombre: string = '';
  username: string = '';
  // password: string = '';
  email: string = '';
  authorities: Set<UserAuthority> = new Set<UserAuthority>();
  menuItems!: MenuItem[];
  tag!: string;
  private menuStrategy!: MenuStrategy;

  constructor(
    public menuStrategyFactory: MenuStrategyFactory,
    public productoModel: UserModel
  ) {}
  getHeaders() {
    this.menuStrategy = this.menuStrategyFactory.getStrategy();
  }

  tienePermiso(permiso: UserAuthority): boolean {
    return this.authorities.has(permiso);
  }

  agregarPermiso(permiso: UserAuthority): void {
    this.authorities.add(permiso);
  }

  eliminarPermiso(permiso: UserAuthority): void {
    this.authorities.delete(permiso);
  }

  listarPermisos(): UserAuthority[] {
    return Array.from(this.authorities);
  }

  getParametros(user: UserDeails): this {
    this.id = user.id;
    this.nombre = user.nombre;
    this.username = user.username;

    this.email = user.email;
    this.authorities = user.authorities;

    return this;
  }
  getUserData(): UserDeails {
    return {
      id: this.id,
      nombre: this.nombre,
      username: this.username,

      email: this.email,
      authorities: this.authorities,
    };
  }
  getMenuItems(selectedItems: User[], callbacks: CallbacksService): MenuItem[] {
    return this.menuStrategy.getMenuItems(this, selectedItems, callbacks);
  }
}
