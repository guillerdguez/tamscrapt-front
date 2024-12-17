import { Injectable } from '@angular/core';
import { PedidoDAO } from '../../DAO/pedido.DAO';
import { PedidoModel } from '../../Model/Views/Dynamic/PedidoModel';
import { Pedido } from '../../Model/Domain/Pedido/PedidoClass';
import { AlgoModel } from '../../Model/Views/Dynamic/AlgoModel';

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  constructor(
    private pedidoDAO: PedidoDAO,
    private pedidoModel: PedidoModel,
    private algoModel: AlgoModel
  ) {}
  //Create
  addPedido(pedido: any): void {
    console.log(pedido);
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
        if (pedidos) {
          const pedidosCreados = this.pedidoModel.crearPedidos(pedidos);
          this.pedidoModel.pedidos = pedidosCreados;
          this.algoModel.algos = pedidosCreados;
        }
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
  //se repitr codigo
  getPedidosPorCliente(): void {
    this.pedidoDAO.getPedidosPorCliente().subscribe({
      next: (pedidos: Pedido[]) => {
        if (pedidos) {
          const pedidosCreados = this.pedidoModel.crearPedidos(pedidos);

          this.pedidoModel.pedidos = pedidosCreados;
          this.algoModel.algos = pedidosCreados;
        }
      },
      error: (error) => {
        console.error(error);
      },
    });
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
  deletePedido(id: number): void {
    this.pedidoDAO.deletePedido(id).subscribe({
      next: (pedido: Pedido) => {
        this.pedidoModel.pedido = pedido;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
