import { Injectable } from '@angular/core';
import { Producto } from '../../Domain/ProductoClass';
import { Router } from '@angular/router';
import { ProductoService } from '../../../Service/Producto.service';
import { AlgoModel } from './AlgoModel';

@Injectable({ providedIn: 'root' })
export class ProductoModel {
  productos: Producto[] = [];
  producto: Producto | undefined;

  // Agregamos el arreglo de campos a mostrar
  private fieldsToShow: string[] = ['nombre', 'categoria', 'descripcion', 'rating'];

  constructor(private router: Router, private algoModel: AlgoModel) {}

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

  // Método para obtener los campos a mostrar
  getFieldsToShow(): string[] {
    return this.fieldsToShow;
  }
}
