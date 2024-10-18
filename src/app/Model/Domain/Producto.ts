import { Pedido } from './Pedido';

export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  imagen: string;
  lettering?: boolean;
  scrapbooking?: boolean;
  oferta?: boolean;
  descuento: number;
  precioFinal?: number;
  pedidos?: Pedido[];
  equals(obj: any): boolean;
  toString(): string;
}
