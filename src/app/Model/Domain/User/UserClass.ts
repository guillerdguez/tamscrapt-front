import { Router } from '@angular/router';
import { AlgoModel } from '../../Views/Dynamic/AlgoModel';
import { UserAuthority } from '../UserAuthority.enum';
import { UserModel } from '../../Views/Dynamic/UserModel';
import { UserService } from '../../../Service/User.service';
import { MenuItem } from 'primeng/api';

export class User {
  id: number = 0;
  nombre: string = '';
  username: string = '';
  password: string = '';
  email: string = '';
  authorities: Set<UserAuthority> = new Set<UserAuthority>();
  url: string = '/newUser';
  menuItems: MenuItem[] = this.getMenuItemOptionsAdmin();

  constructor(
    public router: Router,
    public algoModel: AlgoModel,
    public userModel: UserModel,
    public userService: UserService
  ) {}

  getMenuItemsAdmin(url: string) {
    return [
      {
        label: 'Create',
        icon: 'pi pi-plus',
        command: () => this.router.navigate([url]),
      },
      {
        label: 'Delete',
        icon: 'pi pi-trash',
        command: () => this.delete(),
      },
      {
        label: 'Edit',
        icon: 'pi pi-file-edit',
        command: () => this.router.navigate(['/detail/user/', this.id]),
      },
    ];
  }

  getMenuItemOptionsAdmin() {
    return [
      {
        label: 'Create',
        icon: 'pi pi-plus',
        command: () => {
          this.algoModel.menuItemSeleccionado = 'Create';
          this.algoModel.ejecutarMenuItem();
        },
      },
      {
        label: 'Delete',
        icon: 'pi pi-trash',
        command: () => {
          this.algoModel.menuItemSeleccionado = 'Delete';
          this.algoModel.ejecutarMenuItem();
        },
      },
      {
        label: 'Edit',
        icon: 'pi pi-file-edit',
        command: () => {
          this.algoModel.menuItemSeleccionado = 'Edit';
          this.algoModel.ejecutarMenuItem();
        },
      },
    ];
  }

  delete(): void {
    this.userModel.users = this.userModel.users.filter((h) => h.id !== this.id);
    this.userService.deleteUser(this.id);
  }

  getUrl() {
    return this.url;
  }

  getHeaders() {
    return [
      {
        field: 'username',
        header: 'Username',
        style: {
          'font-weight': 'bold',
          'font-size': '18px',
          'margin-bottom': '8px',
        },
      },
      {
        field: 'email',
        header: 'Email',
        style: {
          'font-weight': 'bold',
          'font-size': '18px',
          'margin-bottom': '8px',
        },
      },
      //   {
      //     field: 'authorities',
      //     header: 'Authorities',
      //     style: {
      //       'font-weight': 'bold',
      //       'font-size': '18px',
      //       'margin-bottom': '8px',
      //     },
      //   },
    ];
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

  getParametros(user: User): User {
    this.id = user.id;
    this.nombre = user.nombre;
    this.username = user.username;
    this.password = user.password;
    this.email = user.email;
    this.authorities = new Set(user.authorities);
    return this;
  }
}
