import { Injectable, Injector } from '@angular/core';

import { MenuStrategyFactory } from '../../Domain/interface/menuItem/MenuStrategyFactory';
import { AlgoModel } from './AlgoModel';
import { User } from '../../Domain/User/UserClass';
import { UserAuthority } from '../../Domain/User/UserAuthority.enum';
import { CallbacksProductoService } from '../../../Service/Callbacks/CallbacksProductoService';
import { TagSeverity } from '../../Domain/interface/type-tag-severity';
// type TagSeverity = { tag: string; severity: string };
@Injectable({ providedIn: 'root' })
export class UserModel {
  users: User[] = [];
  user!: User;
  private callbacksService!: CallbacksProductoService;

  constructor(
    private menuStrategyFactory: MenuStrategyFactory,
    private algoModel: AlgoModel,
    private injector: Injector
  ) {
    this.callbacksService = this.injector.get(CallbacksProductoService);
  }
  // getTagSeverity(user: User): TagSeverity {
  //   if (user.authorities.has(UserAuthority.ADMIN)) {
  //     return { tag: 'ADMIN_USER', severity: 'success' };
  //   } else if (user.authorities.has(UserAuthority.USER)) {
  //     return { tag: 'REGULAR_USER', severity: 'warning' };
  //   } else if (user.authorities.has(UserAuthority.ANONYMOUS)) {
  //     return { tag: 'GUEST_USER', severity: 'info' };
  //   } else {
  //     return { tag: 'UNKNOWN_USER', severity: 'danger' };
  //   }
  // }
  getTagSeverity(user: User): TagSeverity {
    return user.authorities.has(UserAuthority.ADMIN)
      ? { tag: 'ADMIN_USER', severity: 'success' }
      : { tag: 'REGULAR_USER', severity: 'warning' };
  }
  getHeaders() {
    return [{ class: 'username' }, { class: 'email' }];
  }
  crearUsers(users: User[]): User[] {
    const listaUser: User[] = [];
    users.forEach((userDetails) => {
      const newUser = new User(this.menuStrategyFactory, this);

      newUser.getParametros(userDetails);

      const { tag, severity }: TagSeverity = this.getTagSeverity(newUser);
      newUser.tag = tag;
      newUser.severity = severity;

      newUser.menuItems = newUser.getMenuItems(
        this.algoModel.algosSeleccionados,
        this.callbacksService
      );

      listaUser.push(newUser);
    });
    return listaUser;
  }
}
