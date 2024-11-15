import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { EsquemaListaComponent2 } from './UI/producto/listas/esquema-lista/esquema-lista.component';
import { InputSwitchComponent } from './UI/input-switch/input-switch.component';
import { EsquemaListaComponent } from './UI/listas/esquema-lista/esquema-lista.component';
import { PasarInformacionTablaComponent } from './UI/pasar-informacion-tabla/pasar-informacion-tabla.component';
// PrimeNG Modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DataViewModule } from 'primeng/dataview';
import { InputTextModule } from 'primeng/inputtext';
import { ListboxModule } from 'primeng/listbox';
import { TagModule } from 'primeng/tag';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ContextMenuModule } from 'primeng/contextmenu';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { SpeedDialModule } from 'primeng/speeddial';
import { MenuModule } from 'primeng/menu';
import { InputNumberModule } from 'primeng/inputnumber';
import { RatingModule } from 'primeng/rating';

@NgModule({
  declarations: [
    PasarInformacionTablaComponent,
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
    EsquemaListaComponent2,
    InputSwitchComponent,
  ],
  imports: [
    RatingModule,
    InputNumberModule,
    DialogModule,
    CardModule,
    ToastModule,
    CascadeSelectModule,
    ReactiveFormsModule,
    ContextMenuModule,

    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,

    // PrimeNG Modules
    MenuModule,
    DropdownModule,
    ButtonModule,
    PanelModule,
    InputSwitchModule,
    DataViewModule,
    InputTextModule,
    ListboxModule,
    TagModule,
    TableModule,
    ToolbarModule,
    ToastModule,
    SplitButtonModule,
    DynamicDialogModule,
    SpeedDialModule,

    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [provideClientHydration()],
  bootstrap: [AppComponent],
})
export class AppModule {}
