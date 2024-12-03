import { Injectable } from '@angular/core';
import { TipoHandler } from '../../Model/Domain/interface/TipoHandler';
import { ProductoService } from '../Producto.service';

@Injectable()
export class LetteringHandler implements TipoHandler {
  constructor(private productoService: ProductoService) {}

  execute(): void {
    this.productoService.getProductosLettering();
  }

  getTitle(): string {
    return 'Lettering';
  }
  getContextType(): string {
    return 'producto';
  }
}
