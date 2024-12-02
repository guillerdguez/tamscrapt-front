import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

// Componentes principales
import { AppComponent } from './app.component';
import { NavbarComponent } from './UI/layout/navbar/navbar.component';
import { FooterComponent } from './UI/layout/footer/footer.component';
import { HomeComponent } from './UI/home/home.component';
import { CarritoComponent } from './UI/carrito/carrito.component';

// Componentes de administración
import { AdminPedidosComponent } from './UI/admin/admin-pedidos/admin-pedidos.component';
import { ProductoDetailComponent } from './UI/admin/admin-productos/editar/producto-editar/producto-detail.component';
import { UserDetailComponent } from './UI/admin/admin-clientes/user-editar/user-detail.component';
import { FormularioComponentProducto } from './UI/admin/admin-productos/crear/formularioProductos/formulario.component';
import { OfertaDialogComponent } from './UI/admin/admin-productos/oferta-dialog /oferta-dialog.component';

// Otros componentes
import { InputSwitchComponent } from './UI/input-switch/input-switch.component';
import { EsquemaListaComponent } from './UI/listas/esquema-lista/esquema-lista.component';
// import { PasarInformacionTablaComponent } from './UI/pasar-informacion-tabla/pasar-informacion-tabla.component';

// PrimeNG Modules
import { CheckboxModule } from 'primeng/checkbox';
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
import { DynamicDialogModule, DialogService } from 'primeng/dynamicdialog';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { SpeedDialModule } from 'primeng/speeddial';
import { MenuModule } from 'primeng/menu';
import { InputNumberModule } from 'primeng/inputnumber';
import { RatingModule } from 'primeng/rating';
import { SelectButtonModule } from 'primeng/selectbutton';
import { LetteringHandler } from './Service/handler/LetteringHandler';
import { OfertasHandler } from './Service/handler/OfertasHandler';
import { ProductosHandler } from './Service/handler/ProductosHandler';
import { ScrapbookingHandler } from './Service/handler/ScrapbookingHandler';
import { UsersHandler } from './Service/handler/UsersHandler';
import { ProductoService } from './Service/Producto.service';
import { UserService } from './Service/User.service';
import { TipoFactory } from './UI/pasar-informacion-tabla/TipoFactory';
import { StepperModule } from 'primeng/stepper';
import { StepsModule } from 'primeng/steps';
import { MessageService } from 'primeng/api';
import { DialagoOfertaComponent } from './UI/dialago-oferta/dialago-oferta.component';

@NgModule({
  declarations: [
    // Componentes principales
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    CarritoComponent,

    // Componentes de administración
    AdminPedidosComponent,
    ProductoDetailComponent,
    UserDetailComponent,
    FormularioComponentProducto,
    OfertaDialogComponent,
    // Otros componentes
    InputSwitchComponent,
    EsquemaListaComponent,
    DialagoOfertaComponent,
    // PasarInformacionTablaComponent,
  ],
  imports: [
    // Angular Core Modules
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,

    // PrimeNG Modules
    CheckboxModule,
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
    ContextMenuModule,
    CascadeSelectModule,
    DynamicDialogModule,
    CardModule,
    DialogModule,
    SpeedDialModule,
    MenuModule,
    InputNumberModule,
    RatingModule,
    SelectButtonModule,
    StepperModule,
    StepsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    provideClientHydration(),
    DialogService,
    TipoFactory,
    ProductosHandler,
    ScrapbookingHandler,
    LetteringHandler,
    OfertasHandler,
    UsersHandler,
    ProductoService,
    UserService,
    MessageService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
