import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Observable,
  Subject,
  debounceTime,
  distinctUntilChanged,
  switchMap,
} from 'rxjs';
import { Producto } from '../../../Model/Domain/Producto/ProductoClass';
import { GenericModel } from '../../../Model/Views/Dynamic/GenericModel';
import { ProductoModel } from '../../../Model/Views/Dynamic/ProductoModel';
import { CallbacksProductoService } from '../../../Service/Callbacks/CallbacksProductoService';
import { ProductoService } from '../../../Service/producto/Producto.service';

@Component({
  selector: 'app-producto-buscar',
  templateUrl: './producto-buscar.component.html',
  styleUrls: ['./producto-buscar.component.css'],
})
export class ProductoBuscarComponent implements OnInit {
  @ViewChild('buscarBox', { static: true })
  buscarBox!: ElementRef<HTMLInputElement>;

  productos$!: Observable<Producto[]>;
  productos: Producto[] = [];
  private buscarTerms = new Subject<string>();
  showResults: boolean = false;

  constructor(
    private productoService: ProductoService,
    public genericModel: GenericModel,
    public productoModel: ProductoModel,
    public callbacksProductoService: CallbacksProductoService,
    private router: Router
  ) {}

  buscar(term: string): void {
    this.buscarTerms.next(term);
    this.showResults = term.length > 0;
  }

  ngOnInit(): void {
    this.productos$ = this.buscarTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.productoService.buscarProductos(term))
    );
  } 
  rellenar(producto: Producto): void {
    this.router.navigate(['/detail/Productos/', producto.id]);
    this.productoService.getProducto(producto.id);
    this.showResults = false;
    this.buscarBox.nativeElement.value = '';
  }
}
