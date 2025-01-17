import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Pedido } from '../../Model/Domain/Pedido/PedidoClass';
import { CartService } from '../carrito/CartService';
import { PedidoService } from '../pedido/Pedido.service';

@Injectable({
  providedIn: 'root',
})
export class CallbacksPedidoService {
  cartItems: any[] = [];
  openPedidoEstadoDialog$ = new Subject<Pedido[]>();

  constructor(
    private pedidoService: PedidoService,
    private router: Router,
    private cartService: CartService
  ) {}

  createPedido() {
    this.cartItems = this.cartService.getCartItems();
    if (this.cartItems.length === 0) {
      this.router.navigate(['/carrito']);
    } else {
      this.router.navigate(['/checkout']);
      this.pedidoService.addPedido(this.cartItems);
    }
  }

  deletePedidos(selectedItems: Pedido[]) {
    this.pedidoService.deleteMultiplePedidos(selectedItems);
  }
  editPedidos(selectedItems: Pedido[]) {
    this.pedidoService.updateMultiplePedidos(selectedItems);
  }

  editPedido(pedido: Pedido | any[]) {
    let pedidoNoArray;
    if (Array.isArray(pedido)) {
      pedidoNoArray = pedido[0];
    } else {
      pedidoNoArray = pedido;
    }
    this.router.navigate(['/detail/Pedidos/', pedidoNoArray.id]);
    this.pedidoService.getPedido(pedidoNoArray.id);
  }

  viewPedido(pedido: Pedido) {
    if (pedido.id !== undefined) {
      this.pedidoService.getPedido(pedido.id);
    } else {
      console.error('Pedido ID is undefined');
    }
  }
  confirmarPedido(): void {
    console.log(`Confirmando pedido con ID: `);
  }

  cambiarEstadoPedido(selectedItems: Pedido[]) {
    this.openPedidoEstadoDialog$.next(selectedItems);
  }
}
