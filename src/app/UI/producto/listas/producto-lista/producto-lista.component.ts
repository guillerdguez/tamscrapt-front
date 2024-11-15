import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../../../Service/Producto.service';
import { AlgoModel } from '../../../../Model/Views/Dynamic/AlgoModel';
import { Producto } from '../../../../Model/Domain/ProductoClass';
@Component({
  selector: 'app-producto-lista',
  template: `
    <app-esquema-lista [title]="title" [params]="productos"></app-esquema-lista>
  `,
})
export class ProductoListaComponent implements OnInit {
  title: string = 'Productos';
  productos: Producto[] = [];
  constructor(
    private productoService: ProductoService,
    public algoModel: AlgoModel
  ) {}

  ngOnInit(): void {
    this.productos = this.productoService.getProductosArray();
  }

  add(arg0: string) {
    throw new Error('Method not implemented.');
  }
  delete(producto: Producto): void {
    this.algoModel.algos = this.algoModel.algos.filter((h) => h !== producto);
    this.productoService.deleteProducto(producto.id);
  }
}
