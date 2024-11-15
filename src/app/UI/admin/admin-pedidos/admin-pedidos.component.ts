import { Component } from '@angular/core';
import { ProductoService } from '../../../Service/Producto.service';
import { Producto } from '../../../Model/Domain/ProductoClass';
import { AlgoModel } from '../../../Model/Views/Dynamic/AlgoModel';

@Component({
  selector: 'app-admin-pedidos',
  templateUrl: './admin-pedidos.component.html',
  styleUrl: './admin-pedidos.component.css',
})
export class AdminPedidosComponent {
  calcularPrecioOriginal(
    precioConDescuento: number,
    descuento: number
  ): number {
    return parseFloat((precioConDescuento / (1 - descuento / 100)).toFixed(2));
  }

  constructor(
    private productoService: ProductoService,
    public productoModel: AlgoModel
  ) {
    // this.isAdmin = this.checkIfUserIsAdmin();
  }
  ngOnInit(): void {
    this.productoService.getProductos();
  }

  add(arg0: string) {
    throw new Error('Method not implemented.');
  }
  delete(algo: Producto): void {
    this.productoModel.algos = this.productoModel.algos.filter(
      (h) => h !== algo
    );
    this.productoService.deleteProducto(algo.id);
  }
}
