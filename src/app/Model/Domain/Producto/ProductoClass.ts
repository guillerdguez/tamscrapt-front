import { MenuItem } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { MenuStrategy } from '../interface/menuItem/MenuStrategy';
import { MenuStrategyFactory } from '../interface/menuItem/MenuStrategyFactory';
import { ProductoModel } from '../../Views/Dynamic/ProductoModel';
import { ProductoDetails } from '../interface/ProductoDetails';
import { Pedido } from '../Pedido/PedidoClass';

export class Producto {
  id!: number;
  nombre!: string;
  precio!: number;
  imagen!: string;
  cantidad!: number;
  descuento: number = 0;
  precioOriginal?: number;
  descripcion!: string;
  tag!: string;
  lettering?: boolean;
  scrapbooking?: boolean;
  oferta?: boolean;
  favorito?: boolean;
  pedidos?: Pedido[];
  enCarrito: boolean = false;
  cantidadCarrito: number = 0;
  ref!: DynamicDialogRef;
  menuItems!: MenuItem[];
  severity!: string;
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

  // Calcula el precio original en base al descuento
  calcularPrecioOriginal(): number | undefined {
    return this.descuento > 0
      ? parseFloat((this.precio / (1 - this.descuento / 100)).toFixed(2))
      : undefined;
  }

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
    this.enCarrito = producto.enCarrito;
    this.cantidad = producto.cantidad;
    this.precioOriginal = this.calcularPrecioOriginal();
    this.descripcion = producto.descripcion;
    this.cantidadCarrito = producto.cantidadCarrito;
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
      enCarrito: this.enCarrito,
      descripcion: this.descripcion,
      cantidadCarrito: this.cantidadCarrito,
    };
  }

  // Devuelve los elementos del menú basados en la estrategia del menú
  getMenuItems(selectedItems: Producto[]): MenuItem[] {
    return this.menuStrategy.getMenuItems(this, selectedItems);
  }
}
