import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './UI/layout/navbar/navbar.component';
import { FooterComponent } from './UI/layout/footer/footer.component';
import { ProductoListaComponent } from './UI/producto/listas/producto-lista/producto-lista.component';
import { PedidoListaComponent } from './UI/pedido/pedido-lista/pedido-lista.component';
import { OfertaListaComponent } from './UI/producto/listas/oferta-lista/oferta-lista.component';
import { LetteringListaComponent } from './UI/producto/listas/lettering-lista/lettering-lista.component';
import { CarritoComponent } from './UI/carrito/carrito.component';
import { ScrapbookingListaComponent } from './UI/producto/listas/scrapbooking-lista/scrapbooking-lista.component';
import { HttpClientModule } from '@angular/common/http';
import { VerProductoComponent } from './UI/producto/ver-producto/ver-producto.component';
import { HomeComponent } from './UI/home/home.component';
import { PanelGestionComponent } from './UI/admin/panel-gestion/panel-gestion.component';
import { AdminProductosComponent } from './UI/admin/admin-productos/admin-productos.component';
import { AdminClientesComponent } from './UI/admin/admin-clientes/admin-clientes.component';
import { AdminPedidosComponent } from './UI/admin/admin-pedidos/admin-pedidos.component';
import { EsquemaListaComponent } from './UI/producto/listas/esquema-lista/esquema-lista.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    ProductoListaComponent,
    PedidoListaComponent,
    OfertaListaComponent,
    LetteringListaComponent,
    CarritoComponent,
    ScrapbookingListaComponent,
    VerProductoComponent,
    HomeComponent,
    PanelGestionComponent,
    AdminProductosComponent,
    AdminClientesComponent,
    AdminPedidosComponent,
    EsquemaListaComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [provideClientHydration()],
  bootstrap: [AppComponent],
})
export class AppModule {}
