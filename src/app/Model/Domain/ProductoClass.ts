import { MenuItem } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Pedido } from './Pedido';
import { MenuStrategy } from './interface/menuItem/MenuStrategy';
import { MenuStrategyFactory } from './interface/menuItem/MenuStrategyFactory';
import { CallbacksService } from '../../Service/Callbacks/CallbacksService';
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
  pedidos?: Pedido[];
  favorito?: boolean;
  menuItems!: MenuItem[];
  ref!: DynamicDialogRef;
  tag!: string;
  private menuStrategy!: MenuStrategy;
  strategia: string = 'producto';

  constructor(
    public menuStrategyFactory: MenuStrategyFactory,
    public productoModel: ProductoModel
  ) {
    this.menuStrategy = this.menuStrategyFactory.getStrategy(this.strategia);
  }

  // Métodos

  // Devuelve los encabezados
  getHeaders() {
    return this.productoModel.getHeaders();
  }

  // Devuelve el nivel de severidad según el modelo del producto
  getSeverity() {
    return this.productoModel.getSeverity(this);
  }

  // Calcula el precio original en base al descuento
  calcularPrecioOriginal(): number | undefined {
    return this.descuento > 0
      ? parseFloat((this.precio / (1 - this.descuento / 100)).toFixed(2))
      : undefined;
  }
  //Que hacen exactamente?

  // Actualiza los parámetros del producto
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

  // Devuelve los detalles del producto
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

  // Devuelve los elementos del menú basados en la estrategia del menú
  getMenuItems(
    selectedItems: Producto[],
    callbacks: CallbacksService
  ): MenuItem[] {
    return this.menuStrategy.getMenuItems(this, selectedItems, callbacks);
  }
}
