import { Injectable } from '@angular/core';
import { Producto } from '../../Domain/ProductoClass';

@Injectable({ providedIn: 'root' })
export class ProductoModel {
  productos: Producto[] = [];
  producto: Producto | undefined;
}
