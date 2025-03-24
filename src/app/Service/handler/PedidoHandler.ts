 
import { Injectable } from '@angular/core';
import { TipoManejador } from '../../Model/Domain/interface/TipoHandler';
import { PedidoService } from '../pedido/Pedido.service';
import { AuthService } from '../seguridad/AuthService.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PedidoHandler implements TipoManejador {
  constructor(
    private router: Router,
    private pedidoService: PedidoService,
    public authService: AuthService
  ) {}

  ejecutar(): void {
    if (this.authService.getCurrentUserId()) {
      this.pedidoService.getPedidosPorCliente(); 
    } else {
      this.router.navigate(['login']);
    }
  }

  getTitulo(): string {
    return 'Pedidos';
  }
}
