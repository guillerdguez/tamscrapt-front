import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminPedidosComponent } from './UI/admin/admin-pedidos/admin-pedidos.component';
import { CarritoComponent } from './UI/carrito/carrito.component';
import { HomeComponent } from './UI/home/home.component';
import { FormularioComponentProducto } from './UI/admin/admin-productos/crear/formularioProductos/formulario.component';
import { ProductoDetailComponent } from './UI/admin/admin-productos/editar/producto-editar/producto-detail.component';
import { UserDetailComponent } from './UI/admin/admin-clientes/user-editar/user-detail.component';
 import { EsquemaListaComponent } from './UI/listas/esquema-lista/esquema-lista.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'productos', redirectTo: '/tabla/productos' },
  { path: 'ofertas', redirectTo: '/tabla/ofertas' },
  { path: 'lettering', redirectTo: '/tabla/lettering' },
  { path: 'scrapbooking', redirectTo: '/tabla/scrapbooking' },
  { path: 'users', redirectTo: '/tabla/users' },
  { path: 'tabla/:tipo', component: EsquemaListaComponent },

  { path: 'carrito', component: CarritoComponent },
  { path: 'detail/Productos/:id', component: ProductoDetailComponent },
  { path: 'detail/Users/:id', component: UserDetailComponent },

  //admin
  { path: 'admin/pedidos', component: AdminPedidosComponent },
  { path: 'newProducto', component: FormularioComponentProducto },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
