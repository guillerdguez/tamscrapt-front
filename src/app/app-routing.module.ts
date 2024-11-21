import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminUsersComponent } from './UI/admin/admin-clientes/admin-clientes.component';
import { AdminPedidosComponent } from './UI/admin/admin-pedidos/admin-pedidos.component';
import { AdminProductosComponent } from './UI/admin/admin-productos/admin-productos.component';
import { AdminVerProductoComponent } from './UI/admin/admin-ver-producto/Admin-ver-producto.component';
import { PanelGestionComponent } from './UI/admin/panel-gestion/panel-gestion.component';
import { CarritoComponent } from './UI/carrito/carrito.component';
import { HomeComponent } from './UI/home/home.component';
import { PasarInformacionTablaComponent } from './UI/pasar-informacion-tabla/pasar-informacion-tabla.component';
import { VerProductoComponent } from './UI/producto/ver-producto/ver-producto.component';
import { FormularioComponentProducto } from './UI/admin/admin-productos/crear/formularioProductos/formulario.component';
import { ProductoDetailComponent } from './UI/admin/admin-productos/editar/producto-editar/producto-detail.component';
import { UserDetailComponent } from './UI/admin/admin-clientes/user-editar/user-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  // { path: 'productos', component: ProductoListaComponent },
  // { path: 'ofertas', component: OfertaListaComponent },
  // { path: 'lettering', component: LetteringListaComponent },
  // { path: 'scrapbooking', component: ScrapbookingListaComponent },
  { path: 'productos', redirectTo: '/tabla/productos' },
  { path: 'ofertas', redirectTo: '/tabla/ofertas' },
  { path: 'lettering', redirectTo: '/tabla/lettering' },
  { path: 'scrapbooking', redirectTo: '/tabla/scrapbooking' },
  { path: 'users', redirectTo: '/tabla/users' },
  { path: 'tabla/:tipo', component: PasarInformacionTablaComponent },

  { path: 'carrito', component: CarritoComponent },
  { path: 'detail/Productos/:id', component: ProductoDetailComponent },
  { path: 'detail/Users/:id', component: UserDetailComponent },

  //admin
  { path: 'admin', component: PanelGestionComponent },
  { path: 'admin/productos', component: AdminProductosComponent },
  { path: 'admin/users', component: AdminUsersComponent },
  { path: 'admin/pedidos', component: AdminPedidosComponent },
  { path: 'admin/verProducto/:id', component: AdminVerProductoComponent },
  { path: 'newProducto', component: FormularioComponentProducto },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
