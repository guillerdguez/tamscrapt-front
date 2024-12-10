// producto-model.ts
import { Injectable, Injector } from '@angular/core';
import { MenuStrategyFactory } from '../../Domain/interface/menuItem/MenuStrategyFactory';
import { Producto } from '../../Domain/Producto/ProductoClass';
import { AlgoModel } from './AlgoModel';
import { AuthService } from '../../../Service/seguridad/AuthService.service';
import { CallbacksProductoService } from '../../../Service/Callbacks/CallbacksProductoService';
import { TagSeverity } from '../../Domain/interface/type-tag-severity';
import { ProductoDAO } from '../../../DAO/producto.DAO';
import { CarritoDAO } from '../../../DAO/carrito.DAO';
import { BehaviorSubject } from 'rxjs';
import { MessageService } from 'primeng/api';

@Injectable({ providedIn: 'root' })
export class ProductoModel {
  productos: Producto[] = [];
  producto!: Producto;
  private callbacksService!: CallbacksProductoService;
  favoritosCliente: Producto[] = [];
  cartItems: any[] = [];
  private cartItemsSubject = new BehaviorSubject<any[]>([]);

  // Observable para componentes que deseen suscribirse a cambios en el carrito
  cartItems$ = this.cartItemsSubject.asObservable();

  constructor(
    private menuStrategyFactory: MenuStrategyFactory,
    private algoModel: AlgoModel,
    private injector: Injector,
    public authService: AuthService,
    private productoDAO: ProductoDAO,
    private carritoDAO: CarritoDAO,
    private messageService: MessageService
  ) {
    this.callbacksService = this.injector.get(CallbacksProductoService);
    const userId = this.authService.getCurrentUserId();
    if (userId) {
      this.cargarFavoritos(userId);
      this.cargarCarrito(userId);
    }
  }

  actualizarFavoritosCliente(favoritos: Producto[]): void {
    this.favoritosCliente = favoritos;
  }

  actualizarCartItemsCliente(cartItems: any[]): void {
    this.cartItems = cartItems;
    this.cartItemsSubject.next(this.cartItems);
  }

  private cargarFavoritos(clienteId: number): void {
    this.productoDAO.obtenerFavoritos(clienteId).subscribe({
      next: (favoritos: Producto[]) => {
        this.actualizarFavoritosCliente(favoritos);
      },
      error: (error) => {
        console.error('Error al cargar favoritos:', error);
      },
    });
  }

  private cargarCarrito(clienteId: number): void {
    this.carritoDAO.getCarrito().subscribe({
      next: (cartItems: any[]) => {
        this.actualizarCartItemsCliente(cartItems);
      },
      error: (error) => {
        console.error('Error al cargar el carrito:', error);
      },
    });
  }

  getTagSeverity(producto: Producto): TagSeverity {
    const isAdmin = this.authService.hasAuthority('ADMIN');
    const conditions = isAdmin
      ? [
          producto.descuento >= 50,
          producto.descuento >= 20,
          producto.descuento > 0,
          true,
        ]
      : [producto.cantidad > 20, producto.cantidad > 0, true];
    const tagArray = isAdmin ? this.discountArray : this.stockArray;

    return this.evaluateConditions(conditions, tagArray);
  }

  discountArray = [
    { tag: 'HIGH_DISCOUNT', severity: 'success' },
    { tag: 'MEDIUM_DISCOUNT', severity: 'warning' },
    { tag: 'LOW_DISCOUNT', severity: 'secondary' },
    { tag: 'NO_DISCOUNT', severity: 'danger' },
  ];

  stockArray = [
    { tag: 'INSTOCK', severity: 'success' },
    { tag: 'LOWSTOCK', severity: 'warning' },
    { tag: 'OUTOFSTOCK', severity: 'danger' },
  ];

  private evaluateConditions(
    conditions: boolean[],
    tagArray: TagSeverity[]
  ): TagSeverity {
    return tagArray[conditions.findIndex(Boolean)];
  }

  getHeaders() {
    return [
      { class: 'nombre' },
      { class: 'cantidad' },
      { class: 'precio' },
      { class: 'precioOriginal' },
    ];
  }

  crearProductos(productos: Producto[]): Producto[] {
    const listaProducto: Producto[] = [];
    productos.forEach((producto) => {
      const newProducto = new Producto(this.menuStrategyFactory, this);
      newProducto.getParametros(producto);
      newProducto.favorito = !!this.favoritosCliente.find(
        (fav) => fav.id === producto.id
      );
      newProducto.enCarrito = !!this.cartItems.find(
        (item) => item.id === producto.id
      );

      const { tag, severity }: TagSeverity = this.getTagSeverity(newProducto);
      newProducto.tag = tag;
      newProducto.severity = severity;

      newProducto.menuItems = newProducto.getMenuItems(
        this.algoModel.algosSeleccionados,
        this.callbacksService
      );

      listaProducto.push(newProducto);
    });
    return listaProducto;
  }
}
