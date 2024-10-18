import { Component } from '@angular/core';
import { ProductoService } from '../../../Service/Producto.service';
import { ProductoModel } from '../../../Model/Views/Dynamic/ProductoModel';
import { Producto } from '../../../Model/Domain/Producto';

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
    public productoModel: ProductoModel
  ) {}
  ngOnInit(): void {
    this.productoService.getProductos();
  }

  add(arg0: string) {
    throw new Error('Method not implemented.');
  }
  delete(producto: Producto): void {
    this.productoModel.productos = this.productoModel.productos.filter(
      (h) => h !== producto
    );
    this.productoService.deleteProducto(producto.id);
  }
}
