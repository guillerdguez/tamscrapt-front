 
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
 
import { NavbarComponent } from './UI/layout/navbar/navbar.component';
import { FooterComponent } from './UI/layout/footer/footer.component';
import { InputSwitchComponent } from './UI/layout/input-switch/input-switch.component';
 
import { HomeComponent } from './UI/home/home.component';
import { ProductoDetailComponent } from './UI/productos/producto-editar/producto-detail.component';
import { ProductoSearchComponent } from './UI/product-search/producto-search.component';
import { UserDetailComponent } from './UI/clientes/user-editar/user-detail.component';
import { FormularioComponentProducto } from './UI/productos/formularioProductos/formulario.component';
import { FormularioComponentUser } from './UI/clientes/formularioProductos/formulario.component';
import { DialagoOfertaComponent } from './UI/productos/dialago-oferta/dialago-oferta.component';
import { LoginComponent } from './UI/clientes/seguridad/login/login.component';
import { RegisterComponent } from './UI/clientes/seguridad/register/register.component';
import { CartComponent } from './UI/compra/cart/cart.component';
import { CheckoutComponent } from './UI/compra/checkout/checkout.component';
import { PedidoDeailComponent } from './UI/compra/pedido/pedido-deail/pedido-deail.component';
import { DialagoPedidoEstadoComponent } from './UI/compra/pedido/dialago-PedidoEstado/dialago-pedidoEstado.component';
import { EsquemaListaComponent } from './UI/esquema-lista/esquema-lista.component';
 
import { CheckboxModule } from 'primeng/checkbox';
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
import { StepperModule } from 'primeng/stepper';
import { StepsModule } from 'primeng/steps';
import { MessageService } from 'primeng/api';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';
 
import { LetteringHandler } from './Service/handler/LetteringHandler';
import { OfertasHandler } from './Service/handler/OfertasHandler';
import { ProductosHandler } from './Service/handler/ProductosHandler';
import { ScrapbookingHandler } from './Service/handler/ScrapbookingHandler';
import { UsersHandler } from './Service/handler/UsersHandler';
import { PedidosHandler } from './Service/handler/PedidosHandler';
import { PedidoHandler } from './Service/handler/PedidoHandler';
import { FavoritoHandler } from './Service/handler/FavoritoHandler';

import { ProductoService } from './Service/producto/Producto.service';
import { UserService } from './Service/user/User.service';
import { CartService } from './Service/carrito/CartService';
import { CallbacksProductoService } from './Service/Callbacks/CallbacksProductoService';
import { AuthInterceptor } from './Service/seguridad/AuthInterceptor';

@NgModule({
  declarations: [ 
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent, 

    ProductoDetailComponent,
    UserDetailComponent,
    FormularioComponentProducto, 
    InputSwitchComponent,
    EsquemaListaComponent,
    DialagoOfertaComponent,
    LoginComponent,
    RegisterComponent,
    FormularioComponentUser,
    CheckoutComponent,
    CartComponent,
    ProductoSearchComponent,
    PedidoDeailComponent,
    DialagoPedidoEstadoComponent,
  ],
  imports: [
    AnimateOnScrollModule, 
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, 
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
    ProductosHandler,
    ScrapbookingHandler,
    LetteringHandler,
    OfertasHandler,
    UsersHandler,
    ProductoService,
    UserService,
    MessageService,
    CartService,
    CallbacksProductoService,
    PedidosHandler,
    PedidoHandler,
    FavoritoHandler,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
