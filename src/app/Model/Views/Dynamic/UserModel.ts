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
    return user.authorities.has(UserAuthority.ADMIN) ? 'ADMIN_USER' :
           user.authorities.has(UserAuthority.USER) ? 'REGULAR_USER' :
           user.authorities.has(UserAuthority.ANONYMOUS) ? 'GUEST_USER' : 'UNKNOWN_USER';
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
    return [{ class: 'username' }, { class: 'email' }];
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
