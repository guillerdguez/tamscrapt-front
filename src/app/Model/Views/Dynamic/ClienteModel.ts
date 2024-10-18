import { Injectable } from '@angular/core';
import { Cliente } from '../../Domain/Cliente';

@Injectable({ providedIn: 'root' })
export class ClienteModel {
  clientes: Cliente[] = [];
  cliente: Cliente | undefined;
}
