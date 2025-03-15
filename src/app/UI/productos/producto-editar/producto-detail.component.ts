import { Component, OnInit, DoCheck } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ProductoService } from '../../../Service/producto/Producto.service';
import { GenericModel } from '../../../Model/Views/Dynamic/GenericModel';
import { AuthService } from '../../../Service/seguridad/AuthService.service';
import { CallbacksProductoService } from '../../../Service/Callbacks/CallbacksProductoService';
import { UserAuthority } from '../../../Model/Domain/User/UserAuthority.enum';
import { CartService } from '../../../Service/carrito/CartService';

@Component({
  selector: 'app-producto-detail',
  templateUrl: './producto-detail.component.html',
  styleUrls: ['./producto-detail.component.css'],
})
export class ProductoDetailComponent implements OnInit, DoCheck {
  params: any[] = [];
  userAuthority = UserAuthority;
  cantidad: number = 1;
  private elementAnterior: any;

  constructor(
    private productoService: ProductoService,
    private location: Location,
    public genericModel: GenericModel,
    public authService: AuthService,
    public router: Router,
    public route: ActivatedRoute,
    public callbacksProductoService: CallbacksProductoService,
    public cartService: CartService
  ) {}
  ngOnInit(): void {  
    if (
      this.authService.hasAuthority(UserAuthority.ADMIN) &&
      this.genericModel.elementsSeleccionados.length !== 0
    ) {
      this.genericModel.elementsSeleccionados =
        this.genericModel.elementsSeleccionados.filter(
          (item, index, self) =>
            index === self.findIndex((t) => t.id === item.id)
        );
      this.params = this.genericModel.elementsSeleccionados;
    } else {
      const id = Number(this.route.snapshot.paramMap.get('id'));
      this.productoService.getProducto(id);
    }
  }

  ngDoCheck(): void {
    if (this.genericModel.element !== this.elementAnterior) {
      this.elementAnterior = this.genericModel.element;
      this.asignarParamsDesdeGenericModel();
    }
  }
  ngOnDestroy(): void {
    this.genericModel.elementsSeleccionados.length = 0;
    this.genericModel.element = null;
    this.params = [];
    this.genericModel.elementsSeleccionados = [];
  }

  private asignarParamsDesdeGenericModel(): void {
    if (
      Array.isArray(this.genericModel.element) &&
      this.genericModel.element.length > 0
    ) {
      const primerElem = this.genericModel.element[0];
      if (Array.isArray(primerElem)) {
        this.params = [...primerElem];
      } else {
        this.params = [...this.genericModel.element];
      }
    }
  }

  goBack(): void {
    this.location.back();
    this.router.navigateByUrl(this.router.url);
  }

  save(): void {
    this.productoService.updateMultipleProductos(this.params);
    this.location.back();
    this.router.navigateByUrl(this.router.url);
  }

  calcularPrecioOriginal(
    precioConDescuento: number,
    descuento: number
  ): number {
    return parseFloat((precioConDescuento / (1 - descuento / 100)).toFixed(2));
  }

  incrementar(): void {
    this.cantidad++;
  }

  decrementar(): void {
    if (this.cantidad > 1) {
      this.cantidad--;
    }
  }

  addCarrito(): void {
    if (this.params.length > 0) {
      this.cartService.agregarOActualizarProductoCarrito(
        this.params[0],
        this.cantidad,
        false
      );
      this.cantidad = 1;
    }
  }
}
