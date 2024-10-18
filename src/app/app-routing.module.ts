import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductoListaComponent } from './UI/producto/listas/producto-lista/producto-lista.component';
import { OfertaListaComponent } from './UI/producto/listas/oferta-lista/oferta-lista.component';
import { LetteringListaComponent } from './UI/producto/listas/lettering-lista/lettering-lista.component';
import { CarritoComponent } from './UI/carrito/carrito.component';
import { ScrapbookingListaComponent } from './UI/producto/listas/scrapbooking-lista/scrapbooking-lista.component';
import { VerProductoComponent } from './UI/producto/ver-producto/ver-producto.component';
import { HomeComponent } from './UI/home/home.component';
import { PanelGestionComponent } from './UI/admin/panel-gestion/panel-gestion.component';
import { AdminClientesComponent } from './UI/admin/admin-clientes/admin-clientes.component';
import { AdminPedidosComponent } from './UI/admin/admin-pedidos/admin-pedidos.component';
import { AdminProductosComponent } from './UI/admin/admin-productos/admin-productos.component';
import { AdminVerProductoComponent } from './UI/admin/admin-ver-producto/Admin-ver-producto.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'productos', component: ProductoListaComponent },
  { path: 'ofertas', component: OfertaListaComponent },
  { path: 'lettering', component: LetteringListaComponent },
  { path: 'scrapbooking', component: ScrapbookingListaComponent },
  { path: 'carrito', component: CarritoComponent },
  { path: 'ver/:id', component: VerProductoComponent },

  //admin
  { path: 'admin', component: PanelGestionComponent },
  { path: 'admin/productos', component: AdminProductosComponent },
  { path: 'admin/clientes', component: AdminClientesComponent },
  { path: 'admin/pedidos', component: AdminPedidosComponent },
  { path: 'admin/verProducto/:id', component: AdminVerProductoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
