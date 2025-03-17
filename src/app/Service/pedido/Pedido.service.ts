import { Injectable } from '@angular/core';
import { PedidoDAO } from '../../DAO/pedido.DAO';
import { PedidoModel } from '../../Model/Views/Dynamic/PedidoModel';
import { Pedido } from '../../Model/Domain/Pedido/PedidoClass';
import { GenericModel } from '../../Model/Views/Dynamic/GenericModel';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  constructor(
    private pedidoDAO: PedidoDAO,
    private pedidoModel: PedidoModel,
    private genericModel: GenericModel,
    private messageService: MessageService
  ) {}

  // CREATE
  addPedido(pedido: any): void {
    this.pedidoModel.pedidos.push(pedido);
    this.pedidoDAO.addPedido(pedido).subscribe({
      next: (pedido: any) => {
        this.pedidoModel.pedido = pedido;
      },
      error: (error) => {
        this.handleError(error);
      },
    });
  }

  // READ
  getPedidos(): void {
    this.pedidoDAO.getPedidos().subscribe({
      next: (pedidos: Pedido[]) => {
        const pedidosCreados = this.pedidoModel.crearPedidos(pedidos);
        this.pedidoModel.pedidos = pedidosCreados;
        this.genericModel.elements = pedidosCreados;
      },
      error: (error) => {
        console.error(error + 'Error al crear pedido');
      },
    });
  }

  getPedidosPorCliente(): void {
    this.pedidoDAO.getPedidosPorCliente().subscribe({
      next: (pedidos: Pedido[]) => {
        const pedidosCreados = this.pedidoModel.crearPedidos(pedidos);
        this.pedidoModel.pedidos = pedidosCreados;
        this.genericModel.elements = pedidosCreados;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  deleteMultiplePedidos(selectedItems: Pedido[]) {
    selectedItems.forEach((item) => this.deletePedido(item.id));
  }

  getPedido(id: number): void {
    this.pedidoDAO.getPedido(id).subscribe({
      next: (pedido: Pedido) => {
        const pedidosCreado = this.pedidoModel.crearPedidos([pedido]);
        if (Array.isArray(pedidosCreado[0])) {
          this.genericModel.element = pedidosCreado[0];
        } else {
          this.genericModel.element = pedidosCreado;
        }
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  findByName(term: string): void {
    this.pedidoDAO.findByName(term).subscribe({
      next: (pedidos: Pedido[]) => {
        this.pedidoModel.pedidos = pedidos;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  // UPDATE COMPLETO
  updateMultiplePedidos(selectedItems: any[]) {
    selectedItems.forEach((item) => {
      this.updatePedido(item.getPedidoData());
    });
  }

  updatePedido(pedido: any): void {
    this.pedidoDAO.updatePedido(pedido).subscribe({
      next: (pedido: any) => {
        this.pedidoModel.pedido = pedido;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  // NUEVO: Actualizar SOLO el estado
  updateEstadoPedido(id: number, nuevoEstado: string): void {
    this.pedidoDAO.updateEstado(id, nuevoEstado).subscribe({
      next: (pedido: Pedido) => {
         const index = this.pedidoModel.pedidos.findIndex((p) => p.id === id);
        if (index >= 0) {
          this.pedidoModel.pedidos[index].estado = nuevoEstado;
        }
         this.genericModel.elements = [...this.pedidoModel.pedidos];
         this.getPedidos();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  addProductos(
    pedidoId: number,
    productoIds: number[],
    cantidades: number[]
  ): void {
    this.pedidoDAO.addProductos(pedidoId, productoIds, cantidades).subscribe({
      next: (pedido: Pedido) => {
        this.pedidoModel.pedido = pedido;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  // DELETE
  deletePedido(id: any): void {
    this.pedidoDAO.deletePedido(id).subscribe({
      next: (pedido: Pedido) => {
        this.pedidoModel.pedido = pedido;
        this.genericModel.elements = this.genericModel.elements.filter(
          (p: Pedido) => p.id !== id
        );
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  private handleError(error: any): void {
    let detalleError = error;
    if (error.status === 500) {
      detalleError =
        'Error del servidor. Por favor, verifica los logs del backend o intenta nuevamente más tarde.';
    } else if (error.status === 400) {
      detalleError = 'Uno de tus productos no tenía stock o faltan datos.';
    } else if (error.status) {
      detalleError = `Ocurrió un error inesperado. Código de estado: ${error.status}.`;
    }
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: detalleError,
    });
  }
}
