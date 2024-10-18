import { Injectable } from '@angular/core';
import { ClienteDAO } from '../DAO/cliente.DAO';
import { ClienteModel } from '../Model/Views/Dynamic/ClienteModel';
import { Cliente } from '../Model/Domain/Cliente';


@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  constructor(
    private clienteDAO: ClienteDAO,
    private clienteModel: ClienteModel
  ) {}
  //Create
  addCliente(cliente: Cliente): void {
    this.clienteModel.clientes.push(cliente);
    this.clienteDAO.addCliente(cliente).subscribe({
      next: (cliente: Cliente) => {
        this.clienteModel.cliente = cliente;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  //READ
  getClientes(): void {
    this.clienteDAO.getClientes().subscribe({
      next: (clientes: Cliente[]) => {
        this.clienteModel.clientes = clientes;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
  getCliente(id: number): void {
    this.clienteDAO.getCliente(id).subscribe({
      next: (cliente: Cliente) => {
        this.clienteModel.cliente = cliente;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
  findByName(term: string): void {
    this.clienteDAO.findByName(term).subscribe({
      next: (clientes: Cliente[]) => {
        this.clienteModel.clientes = clientes;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
  //UPDATE
  updateCliente(id: number, cliente: Cliente): void {
    this.clienteDAO.updateCliente(cliente).subscribe({
      next: (cliente: Cliente) => {
        this.clienteModel.cliente = cliente;
        //      this.clienteModel.clientes = this.clienteModel.clientes.filter(cliente => cliente.id !== id);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
  //DELETE
  deleteCliente(id: number): void {
    this.clienteDAO.deleteCliente(id).subscribe({
      next: (cliente: Cliente) => {
        this.clienteModel.cliente = cliente;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
