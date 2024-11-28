import { Injectable } from '@angular/core';
import { CallbacksService } from '../../../../Service/Callbacks/CallbacksService';
import { UserModel } from '../../../Views/Dynamic/UserModel';
import { AdminMenuStrategy } from './menuItemProductos/AdminMenuStrategy';
import { UserMenuStrategy } from './menuItemProductos/UserMenuStrategy';
import { MenuStrategy } from './MenuStrategy';

@Injectable({
  providedIn: 'root',
})
export class MenuStrategyFactory {
  constructor(
    private userModel: UserModel,
    private callbacksService: CallbacksService
  ) {}

  getStrategy(): MenuStrategy {
    return this.userModel.admin
      ? new AdminMenuStrategy(this.callbacksService)
      : new UserMenuStrategy(this.callbacksService);
  }
}
