import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  Observable,
  Subject,
  debounceTime,
  distinctUntilChanged,
  switchMap,
} from 'rxjs';
import { Producto } from '../../Model/Domain/Producto/ProductoClass';
import { GenericModel } from '../../Model/Views/Dynamic/GenericModel';
import { ProductoModel } from '../../Model/Views/Dynamic/ProductoModel';
import { CallbacksProductoService } from '../../Service/Callbacks/CallbacksProductoService';
import { ProductoService } from '../../Service/producto/Producto.service';

@Component({
  selector: 'app-producto-search',
  templateUrl: './producto-search.component.html',
  styleUrls: ['./producto-search.component.css'],
})
export class ProductoSearchComponent implements OnInit {
  @ViewChild('searchBox', { static: true })
  searchBox!: ElementRef<HTMLInputElement>;

  productos$!: Observable<Producto[]>;
  productos: Producto[] = [];
  private searchTerms = new Subject<string>();
  showResults: boolean = false;

  constructor(
    private productoService: ProductoService,
    public genericModel: GenericModel,
    public productoModel: ProductoModel,
    public callbacksProductoService: CallbacksProductoService,
    private route: ActivatedRoute
  ) {}

  search(term: string): void {
    this.searchTerms.next(term);
    this.showResults = term.length > 0;
  }

  ngOnInit(): void {
    this.productos$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.productoService.searchProductos(term))
    );
  }

  rellenar(producto: Producto[]): void {
    this.genericModel.elementsSeleccionados = [];
    this.callbacksProductoService.editProducto(producto);
    this.genericModel.elementsSeleccionados = Array.from(producto);
    this.showResults = false;

    // Limpia el campo de búsqueda
    this.searchBox.nativeElement.value = '';
  }
}
