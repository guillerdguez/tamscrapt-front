import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Pedido } from '../../Model/Domain/Pedido/PedidoClass';

@Injectable({
  providedIn: 'root',
})
export class CallbacksPedidoService {
  createPedido$ = new Subject<void>();
  deletePedidos$ = new Subject<Pedido[]>();
  editPedidos$ = new Subject<Pedido[]>();
  editPedido$ = new Subject<any>();
  viewPedido$ = new Subject<Pedido>();
  toggleOfertas$ = new Subject<Pedido[]>();
  toggleFavorito$ = new Subject<Pedido[]>();
  openOfertaDialog$ = new Subject<Pedido[]>();
 
  constructor(private router: Router) {}

  createPedido() {
    this.router.navigate(['carrito']);
    this.createPedido$.next();
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
    // Lógica para confirmar el pedido
    // console.log(`Confirmando pedido con ID: ${this.id}`);
  }
}
