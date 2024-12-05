import { Injectable, Injector } from '@angular/core';
import { MenuStrategyFactory } from '../../Domain/interface/menuItem/MenuStrategyFactory';
import { Producto } from '../../Domain/Producto/ProductoClass';
import { AlgoModel } from './AlgoModel';
import { AuthService } from '../../../Service/seguridad/AuthService.service';
import { CallbacksProductoService } from '../../../Service/Callbacks/CallbacksProductoService';
import { TagSeverity } from '../../Domain/interface/type-tag-severity';

@Injectable({ providedIn: 'root' })
export class ProductoModel {
  productos: Producto[] = [];
  producto!: Producto;
  private callbacksService!: CallbacksProductoService;

  constructor(
    private menuStrategyFactory: MenuStrategyFactory,
    private algoModel: AlgoModel,
    private injector: Injector,
    public authService: AuthService
  ) {
    this.callbacksService = this.injector.get(CallbacksProductoService);
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
  // porque en cards queda desplazado a la derecha
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
