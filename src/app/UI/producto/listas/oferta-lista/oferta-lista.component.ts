import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../../../Service/Producto.service';
import { ProductoModel } from '../../../../Model/Views/Dynamic/ProductoModel';
import { Producto } from '../../../../Model/Domain/Producto';

@Component({
  selector: 'app-oferta-lista',
  template: `<div class="outer" data-height="320">
      <div class="title">
        <div class="image"></div>
        <div class="holder">
          <div class="container">
            <div class="inner">
              <div class="subtitle">
                <h1><span>Ofertas</span></h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <app-esquema-lista [params]="productos"></app-esquema-lista> `,
  styleUrl: 'producto-lista.css',
})
export class OfertaListaComponent implements OnInit {
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
