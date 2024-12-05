import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './UI/home/home.component';
import { EsquemaListaComponent } from './UI/esquema-lista/esquema-lista.component';
import { ProductoDetailComponent } from './UI/productos/producto-editar/producto-detail.component';
import { UserDetailComponent } from './UI/clientes/user-editar/user-detail.component';
import { AdminPedidosComponent } from './UI/compra/pedido/admin-pedidos/admin-pedidos.component';
import { FormularioComponentProducto } from './UI/productos/formularioProductos/formulario.component';
import { authGuard } from './Service/seguridad/AuthGuard';
import { roleGuard } from './Service/seguridad/RoleGuard';
import { LoginComponent } from './UI/clientes/seguridad/login/login.component';
import { RegisterComponent } from './UI/clientes/seguridad/register/register.component';
import { CartComponent } from './UI/compra/cart/cart.component';
import { CheckoutComponent } from './UI/compra/checkout/checkout.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'productos', redirectTo: '/tabla/productos' },
  { path: 'ofertas', redirectTo: '/tabla/ofertas' },
  { path: 'lettering', redirectTo: '/tabla/lettering' },
  { path: 'scrapbooking', redirectTo: '/tabla/scrapbooking' },
  { path: 'users', redirectTo: '/tabla/users' },
  { path: 'tabla/:tipo', component: EsquemaListaComponent },
  { path: 'carrito', component: CartComponent, canMatch: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'checkout', component: CheckoutComponent },

  {
    path: 'detail/Productos/:id',
    component: ProductoDetailComponent,
    canMatch: [authGuard],
  },
  {
    path: 'detail/Users/:id',
    component: UserDetailComponent,
    canMatch: [authGuard],
  },

  // Rutas de Administrador
  {
    path: 'admin/pedidos',
    component: AdminPedidosComponent,
    canMatch: [authGuard, () => roleGuard('ADMIN')],
  },
  {
    path: 'newProducto',
    component: FormularioComponentProducto,
    canMatch: [authGuard, () => roleGuard('ADMIN')],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
