import { Component, OnInit, DoCheck } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Location } from '@angular/common';

import { CallbacksPedidoService } from '../../../../Service/Callbacks/CallbacksPedidoService';
import { PedidoService } from '../../../../Service/pedido/Pedido.service';
import { UserAuthority } from '../../../../Model/Domain/User/UserAuthority.enum';
import { GenericModel } from '../../../../Model/Views/Dynamic/GenericModel';
import { CartService } from '../../../../Service/carrito/CartService';
import { AuthService } from '../../../../Service/seguridad/AuthService.service';
import { ProductoPedido } from '../../../../Model/Domain/interface/producto-pedido';
import { ProductoService } from '../../../../Service/producto/Producto.service';
import { Pedido } from '../../../../Model/Domain/Pedido/PedidoClass';
import { ProductoModel } from '../../../../Model/Views/Dynamic/ProductoModel';
@Component({
  selector: 'app-pedido-deail',
  templateUrl: './pedido-deail.component.html',
  styleUrl: './pedido-deail.component.css',
})
export class PedidoDeailComponent {
  params: any[] = [];
  userAuthority = UserAuthority;
  cantidad: number = 1;
  private elementAnterior: any;
  productos: any[] = [];

  constructor(
    private pedidoService: PedidoService,
    private location: Location,
    public genericModel: GenericModel,
    public authService: AuthService,
    public router: Router,
    public route: ActivatedRoute,
    public callbacksPedidoService: CallbacksPedidoService,
    public cartService: CartService,
    public productoService: ProductoService,
    public productoModel: ProductoModel
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
    } else {
      const id = Number(this.route.snapshot.paramMap.get('id'));
      this.pedidoService.getPedido(id);
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
  }

  //da fallos al ir hacia atras
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
    this.productoService.getProductos();

    this.params.forEach((pedido: any) => {
      pedido.productos.forEach((producto: any) => {
        this.productoService.getProductoPedido(producto.productoId);
        if (!this.productoModel.producto) {
          this.productos.push(this.productoModel.producto);
        }
      });
    });
  }

  goBack(): void {
    this.location.back();
    this.router.navigateByUrl(this.router.url);
  }

  save(): void {
    this.pedidoService.updateMultiplePedidos(this.params);
    this.location.back();
    this.router.navigateByUrl(this.router.url);
  }

  // calcularPrecioOriginal(
  //   precioConDescuento: number,
  //   descuento: number
  // ): number {
  //   return parseFloat((precioConDescuento / (1 - descuento / 100)).toFixed(2));
  // }

  incrementar(): void {
    this.cantidad++;
  }

  decrementar(): void {
    if (this.cantidad > 1) {
      this.cantidad--;
    }
  }
}
