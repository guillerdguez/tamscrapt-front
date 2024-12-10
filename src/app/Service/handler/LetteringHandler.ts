// LetteringHandler.ts
import { Injectable } from '@angular/core';
import { TipoHandler } from '../../Model/Domain/interface/TipoHandler';
import { ProductoService } from '../producto/Producto.service';

@Injectable()
export class LetteringHandler implements TipoHandler {
  constructor(private productoService: ProductoService) {}

  execute(): void {
    this.productoService.getProductos('lettering');  
  }

  getTitle(): string {
    return 'Lettering';
  }
}
