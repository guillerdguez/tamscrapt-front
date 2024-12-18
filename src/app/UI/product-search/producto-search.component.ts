import { from, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Producto } from '../../Model/Domain/Producto/ProductoClass';
import { ProductoService } from '../../Service/producto/Producto.service';
import { AlgoModel } from '../../Model/Views/Dynamic/AlgoModel';
import { ProductoModel } from '../../Model/Views/Dynamic/ProductoModel';
import { CallbacksProductoService } from '../../Service/Callbacks/CallbacksProductoService';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-producto-search',
  templateUrl: './producto-search.component.html',
  styleUrls: ['./producto-search.component.css'],
})
export class ProductoSearchComponent implements OnInit {
  productos$!: Observable<Producto[]>;
  productos: Producto[] = [];
  private searchTerms = new Subject<string>();

  constructor(
    private productoService: ProductoService,
    public algoModel: AlgoModel,
    public productoModel: ProductoModel,
    public callbacksProductoService: CallbacksProductoService,

    private route: ActivatedRoute
  ) {}

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    // Configura el Observable de productos
    this.productos$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.productoService.searchProductos(term))
    );
    // const id = Number(this.route.snapshot.paramMap.get('id'));
    // this.productoService.getProducto(id);
  }
  rellenar(producto: Producto[]) {
    this.algoModel.algosSeleccionados = [];
    this.callbacksProductoService.editProducto(producto);
    this.algoModel.algosSeleccionados = Array.from(producto);
  }
}
