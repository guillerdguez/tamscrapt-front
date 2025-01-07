import { Router } from '@angular/router';
import { GenericModel } from '../../Views/Dynamic/GenericModel';
import { UserAuthority } from './UserAuthority.enum';
import { UserModel } from '../../Views/Dynamic/UserModel';
import { UserService } from '../../../Service/user/User.service';
import { MenuItem } from 'primeng/api';
import { UserDetails } from '../interface/UserDetails';
import { MenuStrategy } from '../interface/menuItem/MenuStrategy';
import { MenuStrategyFactory } from '../interface/menuItem/MenuStrategyFactory';
import { CallbacksProductoService } from '../../../Service/Callbacks/CallbacksProductoService';
import { Producto } from '../Producto/ProductoClass';

export class User {
  // password: string = '';
  id?: number;
  nombre: string = '';
  username: string = '';
  email: string = '';
  authorities!: UserAuthority[];
  menuItems!: MenuItem[];
  tag!: string;
  private menuStrategy!: MenuStrategy;
  admin: boolean = true;
  strategia: string = 'user';
  severity!: string;
  favorito?: Producto[];

  constructor(
    public menuStrategyFactory: MenuStrategyFactory,
    public userModel: UserModel
  ) {
    this.menuStrategy = this.menuStrategyFactory.getStrategy(this.strategia);
  }

  getHeaders() {
    return this.userModel.getHeaders();
  }

  tienePermiso(permiso: UserAuthority): boolean {
    return this.authorities.includes(permiso);
  }

  agregarPermiso(permiso: UserAuthority): void {
    this.authorities.push(permiso);
  }

  eliminarPermiso(permiso: UserAuthority): void {
    this.authorities = this.authorities.filter((auth) => auth !== permiso);
  }

  listarPermisos(): UserAuthority[] {
    return Array.from(this.authorities);
  }

  getParametros(user: UserDetails): this {
    this.id = user.id;
    this.nombre = user.nombre;
    this.username = user.username;
    this.email = user.email;
    this.favorito = user.favorito;

    this.authorities = user.authorities;

    return this;
  }

  getUserData(): UserDetails {
    return {
      id: this.id,
      nombre: this.nombre,
      username: this.username,
      email: this.email,
      authorities: this.authorities,
      favorito: this.favorito,
    };
  }

  getMenuItems(
    selectedItems: User[],
    callbacks: CallbacksProductoService
  ): MenuItem[] {
    return this.menuStrategy.getMenuItems(this, selectedItems, callbacks);
  }
}
