import { ActivatedRoute } from '@angular/router';
import { ClienteModel } from '../../../Model/Views/Dynamic/ClienteModel';
import { ClienteService } from '../../../Service/Cliente.service';
import { Component, OnInit } from '@angular/core';
 
import { Cliente } from '../../../Model/Domain/Cliente';
@Component({
  selector: 'app-admin-clientes',
  templateUrl: './admin-clientes.component.html',
  styleUrl: './admin-clientes.component.css',
})
export class AdminClientesComponent implements OnInit {
  constructor(
    private clienteService: ClienteService,
    public clienteModel: ClienteModel
  ) {}
  ngOnInit(): void {
    this.clienteService.getClientes();
  }

  add(arg0: string) {
    throw new Error('Method not implemented.');
  }
  delete(cliente: Cliente): void {
    this.clienteModel.clientes = this.clienteModel.clientes.filter(
      (h) => h !== cliente
    );
    this.clienteService.deleteCliente(cliente.id);
  }
}
