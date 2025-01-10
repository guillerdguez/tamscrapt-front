import { Injectable } from '@angular/core';
import { PedidoDAO } from '../../DAO/pedido.DAO';
import { PedidoModel } from '../../Model/Views/Dynamic/PedidoModel';
import { Pedido } from '../../Model/Domain/Pedido/PedidoClass';
import { GenericModel } from '../../Model/Views/Dynamic/GenericModel';
import { CallbacksPedidoService } from '../Callbacks/CallbacksPedidoService';

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  constructor(
    private pedidoDAO: PedidoDAO,
    private pedidoModel: PedidoModel,
    private genericModel: GenericModel,
    private callbacksPedidoService: CallbacksPedidoService
  ) {
    this.callbacksPedidoService.deletePedidos$.subscribe((selectedItems) => {
      this.deleteMultiplePedidos(selectedItems);
    });
  }
  //Create
  addPedido(pedido: any): void {
    this.pedidoModel.pedidos.push(pedido);
    this.pedidoDAO.addPedido(pedido).subscribe({
      next: (pedido: any) => {
        this.pedidoModel.pedido = pedido;
      },
      error: (error) => {
        console.error(error);
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
        this.pedidoModel.pedido = pedido;
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
  updatePedido(pedido: Pedido): void {
    this.pedidoDAO.updatePedido(pedido).subscribe({
      next: (pedido: Pedido) => {
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
    console.log('Pedido eliminado', this.genericModel.elements);
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
}
