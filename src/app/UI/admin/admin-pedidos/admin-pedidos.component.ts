import { Component } from '@angular/core';
import { ProductoService } from '../../../Service/Producto.service';
import { ProductoModel } from '../../../Model/Views/Dynamic/ProductoModel';
import { Producto } from '../../../Model/Domain/Producto';

@Component({
  selector: 'app-admin-pedidos',
  templateUrl: './admin-pedidos.component.html',
  styleUrl: './admin-pedidos.component.css'
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
    public productoModel: ProductoModel
  ) {
    // this.isAdmin = this.checkIfUserIsAdmin();
  }
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