import { Injectable, Injector } from '@angular/core';
import { Router } from 'express';
import { CallbacksService } from '../../../Service/Callbacks/CallbacksService';
import { UserService } from '../../../Service/User.service';
import { MenuStrategyFactory } from '../../Domain/interface/menuItem/MenuStrategyFactory';
import { UserDeails } from '../../Domain/interface/UserDetails';
import { User } from '../../Domain/User/UserClass';
import { UserAuthority } from '../../Domain/UserAuthority.enum';
import { AlgoModel } from './AlgoModel';

@Injectable({ providedIn: 'root' })
export class UserModel {
  users: User[] = [];
  user!: User;
  admin = true;
  private callbacksService!: CallbacksService;

  constructor(
    private menuStrategyFactory: MenuStrategyFactory,
    private algoModel: AlgoModel,
    private injector: Injector,
    public userAuthority: UserAuthority,
    private router: Router
  ) {
    this.callbacksService = this.injector.get(CallbacksService);
  }

  getTag(): string {
    if (this.userAuthority === UserAuthority.ADMIN) {
      return 'ADMIN_USER';
    } else if (this.userAuthority === UserAuthority.USER) {
      return 'REGULAR_USER';
    } else if (this.userAuthority === UserAuthority.ANONYMOUS) {
      return 'GUEST_USER';
    }

    return 'UNKNOWN_USER';
  }

  getSeverity(): string | null {
    const severityMap: { [key: string]: string } = {
      ADMIN_USER: 'success',
      REGULAR_USER: 'warning',
      GUEST_USER: 'info',
      UNKNOWN_USER: 'danger',
    };

    return severityMap[this.getTag()] || null;
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

  crearUsers(users: UserDeails[]): User[] {
    const listaUser: User[] = [];
    users.forEach((userDetails) => {
      const newUser = new User(this.menuStrategyFactory, this);
      newUser.getParametros(userDetails);
      newUser.tag = this.getTag(newUser);

      newUser.menuItems = newUser.getMenuItems(
        this.algoModel.algosSeleccionadas,
        this.callbacksService
      );

      this.getSeverity(newUser);
      listaUser.push(newUser);
    });
    return listaUser;
  }
}
