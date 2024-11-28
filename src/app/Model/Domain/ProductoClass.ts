import { MenuItem } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Pedido } from './Pedido';
import { MenuStrategy } from './interface/menuItem/MenuStrategy';
import { MenuStrategyFactory } from './interface/menuItem/MenuStrategyFactory';
import { CallbacksService } from '../../Service/CallbacksService';
import { ProductoModel } from '../Views/Dynamic/ProductoModel';
import { ProductoDetails } from './interface/ProductoDetails';

export class Producto {
  id!: number;
  nombre!: string;
  precio!: number;
  imagen!: string;
  lettering?: boolean;
  scrapbooking?: boolean;
  oferta?: boolean;
  cantidad!: number;
  descuento: number = 0;
  precioOriginal?: number;
  tag!: string;
  pedidos?: Pedido[];
  favorito?: boolean;
  menuItems!: MenuItem[];
  ref!: DynamicDialogRef;
  private menuStrategy!: MenuStrategy;
  constructor(
    public menuStrategyFactory: MenuStrategyFactory,
    public productoModel: ProductoModel
  ) {
    this.menuStrategy = this.menuStrategyFactory.getStrategy();
  }
  //esta bien?
  getHeaders() {
    return this.productoModel.getHeaders();
  }
  getSeverity() {
    return this.productoModel.getSeverity(this);
  }
  calcularPrecioOriginal(): number | undefined {
    return this.descuento > 0
      ? parseFloat((this.precio / (1 - this.descuento / 100)).toFixed(2))
      : undefined;
  }

  getParametros(producto: Producto) {
    this.id = producto.id;
    this.nombre = producto.nombre;
    this.precio = producto.precio;
    this.imagen = producto.imagen;
    this.lettering = producto.lettering;
    this.scrapbooking = producto.scrapbooking;
    this.oferta = producto.oferta;
    this.descuento = producto.descuento;
    this.favorito = producto.favorito;
    this.cantidad = producto.cantidad;
    this.precioOriginal = this.calcularPrecioOriginal();
    this.tag = 'UNKNOWN';
    return this;
  }

  getProductoData(): ProductoDetails {
    return {
      id: this.id,
      nombre: this.nombre,
      precio: this.precio,
      imagen: this.imagen,
      lettering: this.lettering,
      scrapbooking: this.scrapbooking,
      oferta: this.oferta,
      descuento: this.descuento,
      cantidad: this.cantidad,
      precioOriginal: this.calcularPrecioOriginal(),
      favorito: this.favorito,
    };
  }

  getMenuItems(
    selectedItems: Producto[],
    callbacks: CallbacksService
  ): MenuItem[] {
    return this.menuStrategy.getMenuItems(this, selectedItems, callbacks);
  }
}
