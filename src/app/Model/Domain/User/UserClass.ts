import { Router } from '@angular/router';
import { AlgoModel } from '../../Views/Dynamic/AlgoModel';
import { UserAuthority } from './UserAuthority.enum';
import { UserModel } from '../../Views/Dynamic/UserModel';
import { UserService } from '../../../Service/user/User.service';
import { MenuItem } from 'primeng/api';
import { UserDeails } from '../interface/UserDetails';
import { MenuStrategy } from '../interface/menuItem/MenuStrategy';
import { MenuStrategyFactory } from '../interface/menuItem/MenuStrategyFactory';
import { CallbacksProductoService } from '../../../Service/Callbacks/CallbacksService';

export class User {
  // password: string = '';
  id?: number;
  nombre: string = '';
  username: string = '';
  email: string = '';
  authorities: Set<UserAuthority> = new Set<UserAuthority>();
  menuItems!: MenuItem[];
  tag!: string;
  private menuStrategy!: MenuStrategy;
  admin: boolean = true;
  strategia: string = 'user';
  constructor(
    public menuStrategyFactory: MenuStrategyFactory,
    public userModel: UserModel
  ) {
    this.menuStrategy = this.menuStrategyFactory.getStrategy(this.strategia);
  }

  getHeaders() {
    return this.userModel.getHeaders();
  }

  getSeverity() {
    return this.userModel.getSeverity(this);
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

    // Aseguramos que authorities siempre sea un Set<UserAuthority>
    this.authorities = new Set(user.authorities);

    this.tag = 'UNKNOWN';
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

  getMenuItems(
    selectedItems: User[],
    callbacks: CallbacksProductoService
  ): MenuItem[] {
    return this.menuStrategy.getMenuItems(this, selectedItems, callbacks);
  }
}
