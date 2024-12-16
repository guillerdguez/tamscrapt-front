import { Injectable } from '@angular/core';
import { TipoHandler } from '../../Model/Domain/interface/TipoHandler';
import { PedidoService } from '../pedido/Pedido.service';

@Injectable()
export class PedidosHandler implements TipoHandler {
  constructor(private pedidoService: PedidoService) {}

  execute(): void {
    this.pedidoService.getPedidos();
  }

  getTitle(): string {
    return 'Pedidos';
  }
}
