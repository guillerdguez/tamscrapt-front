import { Injectable, Injector } from '@angular/core';
import { ProductoDAO } from '../../../DAO/producto.DAO';
import { CallbacksProductoService } from '../../../Service/Callbacks/CallbacksProductoService';
import { AuthService } from '../../../Service/seguridad/AuthService.service';
import { MenuStrategyFactory } from '../../Domain/interface/menuItem/MenuStrategyFactory';
import { TagSeverity } from '../../Domain/interface/type-tag-severity';
import { Producto } from '../../Domain/Producto/ProductoClass';
import { UserAuthority } from '../../Domain/User/UserAuthority.enum';
import { GenericModel } from './GenericModel';
import { ProductoService } from '../../../Service/producto/Producto.service';

@Injectable({ providedIn: 'root' })
export class ProductoModel {
  productos: Producto[] = [];
  producto!: Producto;
  private callbacksProductoService!: CallbacksProductoService;
  favoritosCliente: Producto[] = [];
  cartItems: any[] = [];
  userId: any;

  constructor(
    private menuStrategyFactory: MenuStrategyFactory,
    private genericModel: GenericModel,
    private injector: Injector,
    public authService: AuthService // private productoService: ProductoService
  ) {
    this.callbacksProductoService = this.injector.get(CallbacksProductoService);
    this.userId = this.authService.getCurrentUserId();
    // if (this.userId) {
    //   this.productoService.cargarFavoritos(this.userId);
    // }
  }

  actualizarFavoritosCliente(favoritos: Producto[]): void {
    this.favoritosCliente = favoritos;
  }
  //cambiar

  getTagSeverity(producto: Producto): TagSeverity {
    const isAdmin = this.authService.hasAuthority(UserAuthority.ADMIN);
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
    { tag: 'STOCK', severity: 'success' },
    { tag: 'POCO STOCK', severity: 'warning' },
    { tag: 'SIN STOCK', severity: 'danger' },
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
      // Reflejar directamente el estado de favoritos
      newProducto.favorito = this.favoritosCliente.some(
        (fav) => fav.id === producto.id
      );

      const { tag, severity }: TagSeverity = this.getTagSeverity(newProducto);
      newProducto.tag = tag;
      newProducto.severity = severity;

      newProducto.menuItems = newProducto.getMenuItems(
        this.genericModel.elementsSeleccionados,
        this.callbacksProductoService
      );

      listaProducto.push(newProducto);
    });
    return listaProducto;
  }
}
