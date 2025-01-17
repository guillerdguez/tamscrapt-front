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
  ) {
    // this.callbacksPedidoService.deletePedidos$.subscribe((selectedItems) => {
    //   this.deleteMultiplePedidos(selectedItems);
    // });
  }
  //Create
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

  //READ
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
  //se repitr codigo
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

        // Si el primer elemento es un arreglo anidado
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
  //UPDATE
  updateMultiplePedidos(selectedItems: any[]) {
    selectedItems.forEach((item) => {
      this.updatePedido(item.getPedidoData());
    });
    // this.genericModel.elementsSeleccionados.length = 0;
  }

  updatePedido(pedido: any): void {
    this.pedidoDAO.updatePedido(pedido).subscribe({
      next: (pedido: any) => {
        this.pedidoModel.pedido = pedido;
        //      this.pedidoModel.pedidos = this.pedidoModel.pedidos.filter(pedido => pedido.id !== id);
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
  //DELETE
  deletePedido(id: any): void {
    this.pedidoDAO.deletePedido(id).subscribe({
      next: (pedido: Pedido) => {
        this.pedidoModel.pedido = pedido;
        this.genericModel.elements = this.genericModel.elements.filter(
          (pedido: Pedido) => pedido.id !== id
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
      detalleError = 'Uno de tus productos no tenia stock.';
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
