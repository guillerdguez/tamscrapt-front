import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private router: Router
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
  //el usar el buscador buguea todo,tenga o no el servicio
  rellenar(producto: Producto): void {
    this.router.navigate(['/detail/Productos/', producto.id]);
    this.productoService.getProducto(producto.id);
    this.showResults = false;
    this.searchBox.nativeElement.value = '';
  }
}
