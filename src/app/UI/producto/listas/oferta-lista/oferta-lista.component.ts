import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../../../Service/Producto.service';
import { AlgoModel } from '../../../../Model/Views/Dynamic/AlgoModel';
import { Producto } from '../../../../Model/Domain/ProductoClass';
import { User } from '../../../../Model/Domain/User/UserClass';

@Component({
  selector: 'app-oferta-lista',
  template: `
    <app-esquema-lista [title]="title" [params]="productos"></app-esquema-lista>
  `,
})
export class OfertaListaComponent implements OnInit {
  title: string = 'Ofertas';
  productos: Producto[] = [];

  constructor(
    private productoService: ProductoService,
    public algoModel: AlgoModel
  ) {}
  ngOnInit(): void {
    this.productos = this.productoService.getProductosOfertaArray();
  }

  add(arg0: string) {
    throw new Error('Method not implemented.');
  }
  delete(producto: Producto): void {
    this.algoModel.algos = this.algoModel.algos.filter((h) => h !== producto);
    this.productoService.deleteProducto(producto.id);
  }
}
