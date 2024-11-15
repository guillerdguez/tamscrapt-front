import { Component, OnChanges, OnInit } from '@angular/core';
import { ProductoService } from '../../../../Service/Producto.service';
import { Producto } from '../../../../Model/Domain/ProductoClass';
import { AlgoModel } from '../../../../Model/Views/Dynamic/AlgoModel';

@Component({
  selector: 'app-lettering-lista',
  template: `
    <app-esquema-lista [title]="title" [params]="productos"></app-esquema-lista>
  `,
})
export class LetteringListaComponent implements OnInit {
  title: string = 'Lettering';
  productos: Producto[] = [];

  constructor(
    private productoService: ProductoService,
    public algoModel: AlgoModel
  ) {}
  ngOnInit(): void {
    this.productos = this.productoService.getProductosLetteringArray();
  }
  add(arg0: string) {
    throw new Error('Method not implemented.');
  }
  delete(producto: Producto): void {
    this.algoModel.algos = this.algoModel.algos.filter((h) => h !== producto);
    this.productoService.deleteProducto(producto.id);
  }
}
