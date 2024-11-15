import { Component } from '@angular/core';
import { ProductoService } from '../../../Service/Producto.service';
import { AlgoModel } from '../../../Model/Views/Dynamic/AlgoModel';
import { Producto } from '../../../Model/Domain/ProductoClass';

@Component({
  selector: 'app-admin-productos',
  templateUrl: './admin-productos.component.html',
  styleUrl: './admin-productos.component.css',
})
export class AdminProductosComponent {
  calcularPrecioOriginal(
    precioConDescuento: number,
    descuento: number
  ): number {
    return parseFloat((precioConDescuento / (1 - descuento / 100)).toFixed(2));
  }

  constructor(
    private productoService: ProductoService,
    public algoModel: AlgoModel
  ) {}
  ngOnInit(): void {
    this.productoService.getProductos();
  }

  add(arg0: string) {
    throw new Error('Method not implemented.');
  }
  delete(producto: Producto): void {
    this.algoModel.algos = this.algoModel.algos.filter((h) => h !== producto);
    this.productoService.deleteProducto(producto.id);
  }
}
