import { Injectable, Injector } from '@angular/core';

import { MenuStrategyFactory } from '../../Domain/interface/menuItem/MenuStrategyFactory';
import { GenericModel } from './GenericModel';
import { User } from '../../Domain/User/UserClass';
import { UserAuthority } from '../../Domain/User/UserAuthority.enum';
import { TagSeverity } from '../../Domain/interface/type-tag-severity';
 @Injectable({ providedIn: 'root' })
export class UserModel {
  users: User[] = [];
  user!: User;

  constructor(
    private menuStrategyFactory: MenuStrategyFactory,
    private genericModel: GenericModel,
    private injector: Injector
  ) {}
 
  getTagSeverity(user: User): TagSeverity {
    return user.authorities.includes(UserAuthority.ADMIN)
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
        this.genericModel.elementsSeleccionados
      );

      listaUser.push(newUser);
    });
    return listaUser;
  }
}
