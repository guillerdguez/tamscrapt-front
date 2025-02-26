import { Component, OnInit, OnDestroy } from '@angular/core';
import { Pedido } from '../../../../Model/Domain/Pedido/PedidoClass';
import { UserAuthority } from '../../../../Model/Domain/User/UserAuthority.enum';
import { CallbacksPedidoService } from '../../../../Service/Callbacks/CallbacksPedidoService';
import { PedidoService } from '../../../../Service/pedido/Pedido.service';
import { AuthService } from '../../../../Service/seguridad/AuthService.service';
import { EstadoPedido } from '../../../../Model/Domain/Pedido/EstadoPedido';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dialago-pedidoEstado',
  templateUrl: './dialago-pedidoEstado.component.html',
  styleUrls: ['./dialago-pedidoEstado.component.css'],
})
export class DialagoPedidoEstadoComponent implements OnInit, OnDestroy {
  isDialogVisible = false;
  pedidosSeleccionados: Pedido[] = [];
  nuevoEstado!: EstadoPedido;
  estadoOptions = Object.values(EstadoPedido);
  userAuthority = UserAuthority;
  subscription!: Subscription;

  constructor(
    private callbacksPedidoService: CallbacksPedidoService,
    private pedidoService: PedidoService,
    public authService: AuthService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.subscription =
      this.callbacksPedidoService.openPedidoEstadoDialog$.subscribe(
        (selectedItems: Pedido[]) => {
          this.pedidosSeleccionados = selectedItems;
          this.isDialogVisible = true;
        }
      );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  guardarCambios(): void {
    if (!this.nuevoEstado) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'Por favor, selecciona un nuevo estado para los pedidos.',
      });
      return;
    }

    this.pedidoService.updateMultiplePedidos(this.pedidosSeleccionados);

    this.isDialogVisible = false;
    this.pedidosSeleccionados = [];
    this.nuevoEstado = undefined as any;
  }

  cancelar(): void {
    this.isDialogVisible = false;
    this.pedidosSeleccionados = [];
    this.nuevoEstado = undefined as any;
  }
}
