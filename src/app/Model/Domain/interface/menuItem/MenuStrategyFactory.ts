// // import { Injectable } from '@angular/core';
// // import { CallbacksProductoService } from '../../../../Service/Callbacks/CallbacksProductoService';
// // import { UserModel } from '../../../Views/Dynamic/UserModel';
// // import { AdminMenuStrategy } from './menuItemProductos/AdminMenuStrategy';
// // import { UserMenuStrategy } from './menuItemProductos/UserMenuStrategy';
// // import { MenuStrategy } from './MenuStrategy';
// // import { User } from '../../User/UserClass';
// // import { AuthService } from '../../../../Service/AuthService.service';

// // @Injectable({
// //   providedIn: 'root',
// // })
// // export class MenuStrategyFactory {
// //   constructor(
// //     // private userModel: UserModel,
// //     private authService: AuthService,
// //     private callbacksService: CallbacksProductoService
// //   ) {}

// //   getStrategy(): MenuStrategy {
// //     return this.user.admin
// //       ? new AdminMenuStrategy(this.callbacksService)
// //       : new UserMenuStrategy(this.callbacksService);
// //   }
// // }
// import { Injectable } from '@angular/core';
// import { MenuStrategy } from './MenuStrategy';
// import { AuthService } from '../../../../Service/AuthService.service';
// import { CallbacksProductoService } from '../../../../Service/Callbacks/CallbacksProductoService';
// import { CallbackUserService } from '../../../../Service/Callbacks/CallbackUserService';
// import { AdminMenuStrategy } from './menuItemProductos/AdminMenuStrategy';
// import { UserMenuStrategy } from './menuItemProductos/UserMenuStrategy';
// import { AdminUserMenuStrategy } from './menuItemUsers/AdminUserMenuStrategy';

// @Injectable({
//   providedIn: 'root',
// })
// export class MenuStrategyFactory {
//   constructor(
//     private authService: AuthService,
//     private callbacksService: CallbacksProductoService,
//     private callbackUserService: CallbackUserService
//   ) {}
//   getStrategy(handler: string): MenuStrategy {
//     switch (handler) {
//       case 'producto':
//         return this.user.admin
//           ? new AdminMenuStrategy(this.callbacksService)
//           : new UserMenuStrategy(this.callbacksService);
//       case 'user':
//         return new AdminUserMenuStrategy(this.callbackUserService);
//       //  ? : new UserMenuStrategy(this.callbacksService);
//       default:
//         throw new Error(
//           `No se encontró una estrategia para el contexto: ${handler}`
//         );
//     }
//   }
// }
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
