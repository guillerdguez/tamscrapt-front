import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './UI/home/home.component';
import { EsquemaListaComponent } from './UI/esquema-lista/esquema-lista.component';
import { LoginComponent } from './UI/clientes/seguridad/login/login.component';
import { CartComponent } from './UI/compra/cart/cart.component';
import { CheckoutComponent } from './UI/compra/checkout/checkout.component';

import { ProductoDetailComponent } from './UI/productos/producto-editar/producto-detail.component';
import { PedidoDeailComponent } from './UI/compra/pedido/pedido-deail/pedido-deail.component';
import { UserDetailComponent } from './UI/clientes/user-editar/user-detail.component';

import { FormularioComponentProducto } from './UI/productos/formularioProductos/formulario.component';
import { FormularioComponentUser } from './UI/clientes/formularioUsers/formulario.component';

import { authGuard } from './Service/seguridad/AuthGuard';
import { roleGuard } from './Service/seguridad/RoleGuard';
import { UserAuthority } from './Model/Domain/User/UserAuthority.enum';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  { path: 'tabla/:tipo', component: EsquemaListaComponent },
  { path: 'productos', redirectTo: '/tabla/productos' },
  { path: 'favorito', redirectTo: '/tabla/favorito' },
  { path: 'ofertas', redirectTo: '/tabla/ofertas' },
  { path: 'lettering', redirectTo: '/tabla/lettering' },
  { path: 'scrapbooking', redirectTo: '/tabla/scrapbooking' },
  { path: 'users', redirectTo: '/tabla/users' },
  { path: 'pedidosCliente', redirectTo: '/tabla/pedidosCliente' },
  { path: 'pedidos', redirectTo: '/tabla/pedidos' },

  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: FormularioComponentUser },
  { path: 'checkout', component: CheckoutComponent },

  { path: 'carrito', component: CartComponent, canMatch: [authGuard] },

  {
    path: 'detail/Productos/:id',
    component: ProductoDetailComponent,
  },
  {
    path: 'detail/Pedidos/:id',
    component: PedidoDeailComponent,
  },
  {
    path: 'detail/Users/:id',
    component: UserDetailComponent,
    canMatch: [authGuard],
  },

  {
    path: 'newProducto',
    component: FormularioComponentProducto,
    canMatch: [authGuard, () => roleGuard(UserAuthority.ADMIN)],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
