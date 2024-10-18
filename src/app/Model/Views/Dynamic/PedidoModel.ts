import { Injectable } from '@angular/core';
import { Pedido } from '../../Domain/Pedido';

@Injectable({ providedIn: 'root' })
export class PedidoModel {
  pedidos: Pedido[] = [];
  pedido: Pedido | undefined;
}
