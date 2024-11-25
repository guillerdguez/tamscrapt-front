import { Injectable } from '@angular/core';
import { Producto } from '../../Domain/ProductoClass';
import { Router } from '@angular/router';
import { ProductoService } from '../../../Service/Producto.service';
import { AlgoModel } from './AlgoModel';
import { ProductoDetails } from '../../Domain/interface/ProductoDetails';
import { UserModel } from './UserModel';
import { DialogService } from 'primeng/dynamicdialog';

@Injectable({ providedIn: 'root' })
export class ProductoModel {
  productos: Producto[] = [];
  producto!: Producto | ProductoDetails;

  constructor(
    private router: Router,
    private algoModel: AlgoModel,
    public userModel: UserModel,
    public dialogService: DialogService
  ) {}

  crearProductos(productos: Producto[], productoService: ProductoService) {
    let listaProducto: Producto[] = [];
    productos.forEach((producto) =>
      listaProducto.push(
        new Producto(
          this.router,
          this.algoModel,
          this,
          this.userModel,
          productoService,
          this.dialogService
        ).getParametros(producto)
      )
    );
    return listaProducto;
  }
}
