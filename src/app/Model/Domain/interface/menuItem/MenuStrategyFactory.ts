import { Injectable } from '@angular/core';
import { MenuStrategy } from './MenuStrategy';
import { AuthService } from '../../../../Service/seguridad/AuthService.service';
import { CallbackUserService } from '../../../../Service/Callbacks/CallbackUserService';
import { AdminMenuStrategy } from './menuItemProductos/AdminMenuStrategy';
import { UserMenuStrategy } from './menuItemProductos/UserMenuStrategy';
import { AdminUserMenuStrategy } from './menuItemUsers/AdminUserMenuStrategy';
import { CallbacksPedidoService } from '../../../../Service/Callbacks/CallbacksPedidoService';
import { CallbacksProductoService } from '../../../../Service/Callbacks/CallbacksProductoService';
import { AdminPedidoMenuStrategy } from './menuItemPedidos/AdminPedidoMenuStrategy';
import { UserPedidoMenuStrategy } from './menuItemPedidos/UserPedidoMenuStrategy';
import { UserAuthority } from '../../User/UserAuthority.enum';

@Injectable({
  providedIn: 'root',
})
export class MenuStrategyFactory {
  private strategyRegistry: { [key: string]: () => MenuStrategy };

  constructor(
    private authService: AuthService,
    private callbacksProductoService: CallbacksProductoService,
    private callbackUserService: CallbackUserService,
    private callbackPedidoService: CallbacksPedidoService
  ) {
    // Registro dinámico de estrategias
    this.strategyRegistry = {
      producto: () =>
        this.authService.hasAuthority(UserAuthority.ADMIN)
          ? new AdminMenuStrategy(this.callbacksProductoService)
          : new UserMenuStrategy(this.callbacksProductoService),
      user: () => new AdminUserMenuStrategy(this.callbackUserService),
      pedido: () =>
        this.authService.hasAuthority(UserAuthority.ADMIN)
          ? new AdminPedidoMenuStrategy(this.callbackPedidoService)
          : new UserPedidoMenuStrategy(this.callbackPedidoService),
    };
  }

  getStrategy(handler: string): MenuStrategy {
    const strategyFactory = this.strategyRegistry[handler];
    if (!strategyFactory) {
      throw new Error(
        `No se encontró una estrategia para el contexto: ${handler}`
      );
    }
    return strategyFactory();
  }
}
