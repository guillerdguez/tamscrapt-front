import { Injectable } from '@angular/core';
import { AuthService } from '../../../../Service/seguridad/AuthService.service';
import { AdminMenuStrategy } from './menuItemProductos/AdminMenuStrategy';
import { UserMenuStrategy } from './menuItemProductos/UserMenuStrategy';
import { AdminUserMenuStrategy } from './menuItemUsers/AdminUserMenuStrategy';
import { AdminPedidoMenuStrategy } from './menuItemPedidos/AdminPedidoMenuStrategy';
import { UserPedidoMenuStrategy } from './menuItemPedidos/UserPedidoMenuStrategy';
import { CallbacksProductoService } from '../../../../Service/Callbacks/CallbacksProductoService';
import { CallbackUserService } from '../../../../Service/Callbacks/CallbackUserService';
import { CallbacksPedidoService } from '../../../../Service/Callbacks/CallbacksPedidoService';
import { MenuStrategy } from './MenuStrategy';
import { UserAuthority } from '../../User/UserAuthority.enum';

@Injectable({
  providedIn: 'root',
})
export class MenuStrategyFactory {
  private strategyRegistry: { [key: string]: MenuStrategy };

  constructor(
    private authService: AuthService,
    private productoCallbacks: CallbacksProductoService,
    private userCallbacks: CallbackUserService,
    private pedidoCallbacks: CallbacksPedidoService
  ) {
    this.strategyRegistry = {
      producto: this.authService.hasAuthority(UserAuthority.ADMIN)
        ? new AdminMenuStrategy(this.productoCallbacks)
        : new UserMenuStrategy(this.productoCallbacks),
      user: new AdminUserMenuStrategy(this.userCallbacks),
      pedido: this.authService.hasAuthority(UserAuthority.ADMIN)
        ? new AdminPedidoMenuStrategy(this.pedidoCallbacks)
        : new UserPedidoMenuStrategy(this.pedidoCallbacks),
    };
  }

  getStrategy(handler: string): MenuStrategy {
    const strategy = this.strategyRegistry[handler];
    if (!strategy) {
      throw new Error(
        `No se encontró una estrategia para el contexto: ${handler}`
      );
    }
    return strategy;
  }
}

// import { Injectable, Injector } from '@angular/core';
// import { MenuStrategy } from './MenuStrategy';
// import { AuthService } from '../../../../Service/seguridad/AuthService.service';
// import { CallbackUserService } from '../../../../Service/Callbacks/CallbackUserService';
// import { AdminMenuStrategy } from './menuItemProductos/AdminMenuStrategy';
// import { UserMenuStrategy } from './menuItemProductos/UserMenuStrategy';
// import { AdminUserMenuStrategy } from './menuItemUsers/AdminUserMenuStrategy';
// import { CallbacksPedidoService } from '../../../../Service/Callbacks/CallbacksPedidoService';
// import { CallbacksProductoService } from '../../../../Service/Callbacks/CallbacksProductoService';
// import { AdminPedidoMenuStrategy } from './menuItemPedidos/AdminPedidoMenuStrategy';
// import { UserPedidoMenuStrategy } from './menuItemPedidos/UserPedidoMenuStrategy';
// import { UserAuthority } from '../../User/UserAuthority.enum';

// @Injectable({
//   providedIn: 'root',
// })
// export class MenuStrategyFactory {
//   private strategyRegistry: { [key: string]: () => MenuStrategy };

//   constructor(
//     private injector: Injector, // Inyectamos el Injector
//     private authService: AuthService
//   ) {
//     // Registro dinámico de estrategias usando Injector
//     this.strategyRegistry = {
//       producto: () =>
//         this.authService.hasAuthority(UserAuthority.ADMIN)
//           ? new AdminMenuStrategy(this.injector.get(CallbacksProductoService))
//           : new UserMenuStrategy(this.injector.get(CallbacksProductoService)),
//       user: () =>
//         new AdminUserMenuStrategy(this.injector.get(CallbackUserService)),
//       pedido: () =>
//         this.authService.hasAuthority(UserAuthority.ADMIN)
//           ? new AdminPedidoMenuStrategy(
//               this.injector.get(CallbacksPedidoService)
//             )
//           : new UserPedidoMenuStrategy(
//               this.injector.get(CallbacksPedidoService)
//             ),
//     };
//   }

//   getStrategy(handler: string): MenuStrategy {
//     const strategyFactory = this.strategyRegistry[handler];
//     if (!strategyFactory) {
//       throw new Error(
//         `No se encontró una estrategia para el contexto: ${handler}`
//       );
//     }
//     return strategyFactory();
//   }
// }
