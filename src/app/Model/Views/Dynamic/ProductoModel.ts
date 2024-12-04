import { Injectable, Injector } from '@angular/core';
import { MenuStrategyFactory } from '../../Domain/interface/menuItem/MenuStrategyFactory';
import { Producto } from '../../Domain/Producto/ProductoClass';
import { AlgoModel } from './AlgoModel';
import { AuthService } from '../../../Service/seguridad/AuthService.service';
import { CallbacksProductoService } from '../../../Service/Callbacks/CallbacksService';

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
  getTag(producto: Producto): string {
    if (this.authService.hasAuthority('ADMIN')) {
      return producto.descuento >= 50
        ? 'HIGH_DISCOUNT'
        : producto.descuento >= 20
        ? 'MEDIUM_DISCOUNT'
        : producto.descuento > 0
        ? 'LOW_DISCOUNT'
        : 'NO_DISCOUNT';
    }

    return producto.cantidad > 20
      ? 'INSTOCK'
      : producto.cantidad > 0
      ? 'LOWSTOCK'
      : 'OUTOFSTOCK';
  }

  getSeverity(producto: Producto): string | null {
    return (
      {
        INSTOCK: 'success',
        HIGH_DISCOUNT: 'success',
        LOWSTOCK: 'warning',
        MEDIUM_DISCOUNT: 'warning',
        LOW_DISCOUNT: 'secondary',
        OUTOFSTOCK: 'danger',
        NO_DISCOUNT: 'danger',
      }[producto.tag] || null
    );
  }
  // getSeverity(producto: Producto): string | null {
  //   const tag = producto.tag;
  //   return ['INSTOCK', 'HIGH_DISCOUNT'].includes(tag)
  //     ? 'success'
  //     : ['LOWSTOCK', 'MEDIUM_DISCOUNT'].includes(tag)
  //     ? 'warning'
  //     : ['LOW_DISCOUNT'].includes(tag)
  //     ? 'secondary'
  //     : ['OUTOFSTOCK', 'NO_DISCOUNT'].includes(tag)
  //     ? 'danger'
  //     : null;
  // }

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
      newProducto.tag = this.getTag(newProducto);

      newProducto.menuItems = newProducto.getMenuItems(
        this.algoModel.algosSeleccionados,
        this.callbacksService
      );

      this.getSeverity(newProducto);
      listaProducto.push(newProducto);
    });
    return listaProducto;
  }
}
