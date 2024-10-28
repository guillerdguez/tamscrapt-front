import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../../../Service/Producto.service';
import { ProductoModel } from '../../../../Model/Views/Dynamic/ProductoModel';
import { Producto } from '../../../../Model/Domain/Producto';

@Component({
  selector: 'app-oferta-lista',
  template: `
    <app-esquema-lista [title]="title"></app-esquema-lista>
    <app-esquema-lista [params]="productos"></app-esquema-lista>
  `, 
})
export class OfertaListaComponent implements OnInit {
  title: string = 'Ofertas';
  productos: Producto[] = [];

  constructor(
    private productoService: ProductoService,
    public productoModel: ProductoModel
  ) {}
  ngOnInit(): void {
    this.productos = this.productoService.getProductosOfertaArray();
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
