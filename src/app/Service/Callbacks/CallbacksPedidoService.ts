import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Pedido } from '../../Model/Domain/Pedido/PedidoClass';
import { CartService } from '../carrito/CartService';

@Injectable({
  providedIn: 'root',
})
export class CallbacksPedidoService {
  createPedido$ = new Subject<void>();
  deletePedidos$ = new Subject<Pedido[]>();
  editPedidos$ = new Subject<Pedido[]>();
  editPedido$ = new Subject<any>();
  viewPedido$ = new Subject<Pedido>();
  cartItems: any[] = [];
  // toggleOfertas$ = new Subject<Pedido[]>();
  // toggleFavorito$ = new Subject<Pedido[]>();
  // openOfertaDialog$ = new Subject<Pedido[]>();

  constructor(private router: Router, private cartService: CartService) {}

  createPedido() {
    this.cartItems = this.cartService.getCartItems();
    if (this.cartItems.length === 0) {
      console.log('Creando pedido mal');
      this.router.navigate(['/carrito']);
    } else {
      this.router.navigate(['/checkout']);
      this.createPedido$.next();
    }
  }

  deletePedidos(selectedItems: Pedido[]) {
    this.deletePedidos$.next(selectedItems);
  }
  editPedidos(selectedItems: Pedido[]) {
    this.editPedidos$.next(selectedItems);
  }

  editPedido(pedido: Pedido | any[]) {
    let pedidoNoArray;
    if (Array.isArray(pedido)) {
      pedidoNoArray = pedido[0];
    } else {
      pedidoNoArray = pedido;
    }
    this.router.navigate(['/detail/Pedidos/', pedidoNoArray.id]);
    this.editPedido$.next(pedido);
  }

  viewPedido(pedido: Pedido) {
    this.viewPedido$.next(pedido);
  }
  confirmarPedido(): void {
    console.log(`Confirmando pedido con ID: `);
  }
}
