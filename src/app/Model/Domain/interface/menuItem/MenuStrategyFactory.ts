// // import { Injectable } from '@angular/core';
// // import { CallbacksService } from '../../../../Service/Callbacks/CallbacksService';
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
// //     private user: AuthService,
// //     private callbacksService: CallbacksService
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
// import { CallbacksService } from '../../../../Service/Callbacks/CallbacksService';
// import { CallbackUserService } from '../../../../Service/Callbacks/CallbackUserService';
// import { AdminMenuStrategy } from './menuItemProductos/AdminMenuStrategy';
// import { UserMenuStrategy } from './menuItemProductos/UserMenuStrategy';
// import { AdminUserMenuStrategy } from './menuItemUsers/AdminUserMenuStrategy';

// @Injectable({
//   providedIn: 'root',
// })
// export class MenuStrategyFactory {
//   constructor(
//     private user: AuthService,
//     private callbacksService: CallbacksService,
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
import { AuthService } from '../../../../Service/AuthService.service';
import { CallbacksService } from '../../../../Service/Callbacks/CallbacksService';
import { CallbackUserService } from '../../../../Service/Callbacks/CallbackUserService';
import { AdminMenuStrategy } from './menuItemProductos/AdminMenuStrategy';
import { UserMenuStrategy } from './menuItemProductos/UserMenuStrategy';
import { AdminUserMenuStrategy } from './menuItemUsers/AdminUserMenuStrategy';

@Injectable({
  providedIn: 'root',
})
export class MenuStrategyFactory {
  private strategyRegistry: { [key: string]: () => MenuStrategy };

  constructor(
    private user: AuthService,
    private callbacksService: CallbacksService,
    private callbackUserService: CallbackUserService
  ) {
    // Registro dinámico de estrategias
    this.strategyRegistry = {
      producto: () =>
        this.user.admin
          ? new AdminMenuStrategy(this.callbacksService)
          : new UserMenuStrategy(this.callbacksService),
      user: () => new AdminUserMenuStrategy(this.callbackUserService),
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
