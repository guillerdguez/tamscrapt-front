import { Injectable, Injector } from '@angular/core';
import { CallbacksService } from '../../../Service/Callbacks/CallbacksService';
import { MenuStrategyFactory } from '../../Domain/interface/menuItem/MenuStrategyFactory';
import { ProductoDetails } from '../../Domain/interface/ProductoDetails';
import { Producto } from '../../Domain/ProductoClass';
import { AlgoModel } from './AlgoModel';
import { UserModel } from './UserModel';

@Injectable({ providedIn: 'root' })
export class ProductoModel {
  productos: Producto[] = [];
  producto!: Producto | ProductoDetails;
  private callbacksService!: CallbacksService;

  constructor(
    private menuStrategyFactory: MenuStrategyFactory,
    private algoModel: AlgoModel,
    private injector: Injector,
    public userModel: UserModel
  ) {
    this.callbacksService = this.injector.get(CallbacksService);
  }
  getTag(producto: Producto): string {
    if (this.userModel.admin) {
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
    const severityMap: { [key: string]: string } = {
      INSTOCK: 'success',
      HIGH_DISCOUNT: 'success',
      LOWSTOCK: 'warning',
      MEDIUM_DISCOUNT: 'warning',
      LOW_DISCOUNT: 'secondary',
      OUTOFSTOCK: 'danger',
      NO_DISCOUNT: 'danger',
    };

    return severityMap[producto.tag] || null;
  }

  // porque en cards queda desplazado a la derecha
  getHeaders() {
    const commonHeaders = [
      {
        field: 'nombre',
        header: 'Producto',
        style: {
          'font-weight': 'bold',
          'font-size': '24px',
          'font-family': "'Poppins', sans-serif",
          color: '#333',
        },
      },
      {
        field: 'cantidad',
        header: 'Disponibilidad',
        formatter: (value: number) => `Quedan: ${value}`,
        style: {
          'font-size': '20px',
          color: '#333',
          'font-weight': 'bold',
        },
      },
      {
        field: 'precio',
        header: 'Precio Actual',
        formatter: (value: number) => `${value.toFixed(2)} €`,
        style: {
          'font-size': '20px',
          color: '#333',
          'font-weight': 'bold',
        },
      } as any,
    ];

    if (
      this.productos.some((producto) => producto.precioOriginal !== undefined)
    ) {
      commonHeaders.push({
        field: 'precioOriginal',
        header: 'Precio Original',
        style: {
          'font-size': '17px',
          color: '#888',
          'text-decoration': 'line-through',
        },
        formatter: (value: number) => `${value.toFixed(2)} €`,
      });
    }

    return commonHeaders;
  }

  crearProductos(productos: Producto[]): Producto[] {
    const listaProducto: Producto[] = [];
    productos.forEach((producto) => {
      const newProducto = new Producto(this.menuStrategyFactory, this);
      newProducto.getParametros(producto);
      newProducto.tag = this.getTag(newProducto);

      newProducto.menuItems = newProducto.getMenuItems(
        this.algoModel.algosSeleccionadas,
        this.callbacksService
      );

      this.getSeverity(newProducto);
      listaProducto.push(newProducto);
    });
    return listaProducto;
  }
}
