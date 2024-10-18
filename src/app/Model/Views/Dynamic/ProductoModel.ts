import { Injectable } from '@angular/core';
import { Producto } from '../../Domain/Producto';

@Injectable({ providedIn: 'root' })
export class ProductoModel {
  productos: Producto[] = [];
  producto: Producto | undefined;
nombre: any;
}
