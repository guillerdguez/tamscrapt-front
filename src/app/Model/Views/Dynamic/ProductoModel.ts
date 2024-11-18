import { Injectable } from '@angular/core';
import { Producto } from '../../Domain/ProductoClass';
import { Router } from '@angular/router';
import { ProductoService } from '../../../Service/Producto.service';
import { AlgoModel } from './AlgoModel';

@Injectable({ providedIn: 'root' })
export class ProductoModel {
  constructor(private router: Router, private algoModel: AlgoModel) {}
  productos: Producto[] = [];
  producto: Producto | undefined;

  crearProductos(productos: Producto[], productoService: ProductoService) {
    let listaProducto: Producto[] = [];
    productos.forEach((producto) =>
      listaProducto.push(
        new Producto(
          this.router,
          this.algoModel,
          this,
          productoService
        ).getParametros(producto)
      )
    );
    return listaProducto;
  }
}
