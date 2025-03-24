import { Injectable } from '@angular/core';
import { TipoManejador } from '../../Model/Domain/interface/TipoHandler';
import { PedidoService } from '../pedido/Pedido.service';

@Injectable()
export class PedidosHandler implements TipoManejador {
  constructor(private pedidoService: PedidoService) {}

  ejecutar(): void {
    this.pedidoService.getPedidos();
  }

  getTitulo(): string {
    return 'Pedidos';
  }
}
