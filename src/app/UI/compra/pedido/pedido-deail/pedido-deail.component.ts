
import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { CallbacksPedidoService } from '../../../../Service/Callbacks/CallbacksPedidoService';
import { PedidoService } from '../../../../Service/pedido/Pedido.service';
import { UserAuthority } from '../../../../Model/Domain/User/UserAuthority.enum';
import { GenericModel } from '../../../../Model/Views/Dynamic/GenericModel';
import { CartService } from '../../../../Service/carrito/CartService';
import { AuthService } from '../../../../Service/seguridad/AuthService.service';
import { ProductoService } from '../../../../Service/producto/Producto.service';
import { ProductoModel } from '../../../../Model/Views/Dynamic/ProductoModel';
import { Producto } from '../../../../Model/Domain/Producto/ProductoClass';
import { Pedido } from '../../../../Model/Domain/Pedido/PedidoClass';

@Component({
  selector: 'app-pedido-deail',
  templateUrl: './pedido-deail.component.html',
  styleUrls: ['./pedido-deail.component.css'],
})
export class PedidoDeailComponent implements OnInit, DoCheck, OnDestroy {
  params: any[] = [];
  userAuthority = UserAuthority;
  cantidad = 1;
  private elementAnterior: any;
  productosMap: Map<number, Producto> = new Map<number, Producto>();

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

    const productoIds: number[] = [];
    this.params.forEach((p: any) => {
      p.productos.forEach((prod: any) => {
        productoIds.push(prod.productoId);
      });
    });
    const uniqueIds = Array.from(new Set(productoIds));

    this.productoService.getProductosPorIds(uniqueIds).subscribe({
      next: (productos: Producto[]) => {
        productos.forEach((prod) => {
          this.productosMap.set(prod.id, prod);
        });
      },
      error: (err) => {
        console.error('Error al obtener productos:', err);
      },
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

  incrementar(): void {
    this.cantidad++;
  }

  decrementar(): void {
    if (this.cantidad > 1) {
      this.cantidad--;
    }
  }
}
