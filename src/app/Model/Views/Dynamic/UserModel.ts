import { Injectable, Injector } from '@angular/core';

import { CallbacksService } from '../../../Service/Callbacks/CallbacksService';
import { MenuStrategyFactory } from '../../Domain/interface/menuItem/MenuStrategyFactory';
import { AlgoModel } from './AlgoModel';
import { User } from '../../Domain/User/UserClass';
import { UserAuthority } from '../../Domain/UserAuthority.enum';

@Injectable({ providedIn: 'root' })
export class UserModel {
  users: User[] = [];
  user!: User;
  private callbacksService!: CallbacksService;

  constructor(
    private menuStrategyFactory: MenuStrategyFactory,
    private algoModel: AlgoModel,
    private injector: Injector
  ) {
    this.callbacksService = this.injector.get(CallbacksService);
  }

  getTag(user: User): string {
    if (user.authorities.has(UserAuthority.ADMIN)) {
      return 'ADMIN_USER';
    } else if (user.authorities.has(UserAuthority.USER)) {
      return 'REGULAR_USER';
    } else if (user.authorities.has(UserAuthority.ANONYMOUS)) {
      return 'GUEST_USER';
    }

    return 'UNKNOWN_USER';
  }

  getSeverity(user: User): string | null {
    const severityMap: { [key: string]: string } = {
      ADMIN_USER: 'success',
      REGULAR_USER: 'warning',
      GUEST_USER: 'info',
      UNKNOWN_USER: 'danger',
    };

    return severityMap[user.tag] || null;
  }

  getHeaders() {
    const commonHeaders = [
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
      } as any,
    ];

    return commonHeaders;
  }

  crearUsers(users: User[]): User[] {
    const listaUser: User[] = [];
    users.forEach((userDetails) => {
      const newUser = new User(this.menuStrategyFactory, this);
      newUser.getParametros(userDetails);
      newUser.tag = this.getTag(newUser);

      newUser.menuItems = newUser.getMenuItems(
        this.algoModel.algosSeleccionados,
        this.callbacksService
      );

      this.getSeverity(newUser);
      listaUser.push(newUser);
    });
    return listaUser;
  }
}
