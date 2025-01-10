import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
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
export class ProductoDetailComponent implements OnInit {
  params: any[] = [];
  userAuthority = UserAuthority;
  cantidad: number = 1;
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
    this.params = [...this.genericModel.elementsSeleccionados];
    //borra los seleccionados si dan para atrás sin guardar pero no si dan al navegador
    this.location.subscribe(() => {
      this.genericModel.elementsSeleccionados.length = 0;
    });
  }

  goBack(): void {
    this.location.back();
    this.router.navigateByUrl(this.router.url);
    this.genericModel.elementsSeleccionados.length = 0;
  }

  save(): void {
    this.productoService.editMultipleProductos(this.params);
    this.location.back();
    this.router.navigateByUrl(this.router.url);
  }

  calcularPrecioOriginal(
    precioConDescuento: number,
    descuento: number
  ): number {
    return parseFloat((precioConDescuento / (1 - descuento / 100)).toFixed(2));
  }

  incrementar() {
    this.cantidad++;
  }

  decrementar() {
    if (this.cantidad > 1) {
      this.cantidad--;
    }
  }
  addCarrito() {
    console.log(this.params[0]);
    this.cartService.addProductoCarrito(this.params[0], this.cantidad);

    this.cantidad = 1;
  }
}
