import { Injectable } from '@angular/core';
import { CallbacksService } from '../../../../Service/CallbacksService';
import { UserModel } from '../../../Views/Dynamic/UserModel';
import { AdminMenuStrategy } from './AdminMenuStrategy';
import { MenuStrategy } from './MenuStrategy';
import { UserMenuStrategy } from './UserMenuStrategy';

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
